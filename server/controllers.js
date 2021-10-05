const { default: axios } = require('axios');
const classOrder = require('../classes/orderClass');
const classRes = require('../classes/responseClass');

const { Order } = classOrder;
const { Response } = classRes;

async function checkOrderList(orderId) {
  try {
    const res = await axios.get('https://code-challenge-i2hz6ik37a-uc.a.run.app/orders');
    for (let i = 0; i < res.data.length; i++) {
      const currentOrder = res.data[i];
      // if an orderid matches order within list send positive response
      if (currentOrder.id === orderId) {
        return new Response(200, true, 'Order Details', currentOrder);
      }
    }
    // if order is not found return an error
    return new Response(500, false, 'Order Details');
  } catch (err) {
    return new Response(500, false, 'Order Details', err);
  }
}

async function getOrderDetails(orderID) {
  try {
    const res = await axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/orders/${orderID}`);
    return new Response(200, true, 'Order Details', res.data);
  } catch (err) {
    // Ensure failure/confirmation of existence of order
    try {
      const data = await checkOrderList(orderID);
      return new Response(200, true, 'Order Details', data.data);
    } catch (err2) {
      return new Response(500, false, 'Order Details', err2);
    }
  }
}

async function findTaxRate(zip) {
  try {
    const res = await axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/cities/${zip}`);
    const { tax_rate } = res.data;
    return new Response(200, true, 'Tax Rate', tax_rate);
  } catch (err) {
    return new Response(500, false, 'Tax Rate', err);
  }
}

function financial(val) {
  return Number.parseFloat(val).toFixed(2);
}

function calculateSubTotals(items, taxRate) {
  const totals = { subTotal: 0, taxes: 0, total: 0 };

  // convert tax rate ex: 7.25 === 0.0725
  const taxes = taxRate / 100;

  for (let i = 0; i < items.length; i++) {
    const currentItem = items[i];
    const currentItemPrice = currentItem.price / 100;
    const taxesOnItem = currentItemPrice * taxes;

    // add item price to subtotal and overall total
    totals.subTotal += currentItemPrice * currentItem.quantity;
    totals.total += currentItemPrice * currentItem.quantity;

    // if item is taxable then add tax to total and taxes
    if (currentItem.taxable) {
      totals.total += taxesOnItem * currentItem.quantity;
      totals.taxes += taxesOnItem * currentItem.quantity;
    }
  }
  // round all financial totals
  totals.subTotal = financial(totals.subTotal);
  totals.taxes = financial(totals.taxes);
  totals.total = financial(totals.total);
  return totals;
}

async function calculateOrderTotal(req, res) {
  // Run lowercase function to ensure case sensitivity
  const orderId = req.params.id.toLowerCase();
  const orderDetails = await getOrderDetails(orderId);

  // Pull order information including items ordered
  if (orderDetails.status === 500) {
    return res.status(500).send(orderDetails);
  }
  // Pull order id and purchaser name
  let { order_items } = orderDetails.data;
  const {id,shipping_name} = orderDetails.data;

  // if using orders retrival instead of orderid ensure items ordered is iterable
  if (!Array.isArray(order_items)) {
    const temp = [];
    temp.push(order_items);
    order_items = temp;
  }

  // Find tax rate for order zip code
  const taxRate = await findTaxRate(orderDetails.data.zip_code);
  if (taxRate.status === 500) {
    return res.status(500).send(taxRate);
  }
  const subTotals = calculateSubTotals(order_items, taxRate.data);
  const { subTotal, taxes, total } = subTotals;

  orderDetails.data = new Order(id, shipping_name, taxes, subTotal, total);
  orderDetails.message = 'Successful lookup of Order details and Tax Rates';

  return res.send(orderDetails);
}

module.exports = {
  calculateOrderTotal,
};
