const { default: axios } = require('axios');
const classOrder = require('./orderClass');
const classRes = require('./responseClass');

const { Order } = classOrder;
const { Response } = classRes;

async function getOrderDetails(orderID) {
  try {
    const res = await axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/orders/${orderID}`);
    return new Response(200, true, 'Order Details', res.data);
  } catch (err) {
    return new Response(500, false, 'Order Details', err);
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

function calculateSubTotals(items, taxRate) {
}

async function calculateOrderTotal(req, res) {
  // Run lowercase function to ensure case sensitivity
  const orderId = req.params.id.toLowerCase();
  let orderDetails;
  let taxRate;
  try {
    orderDetails = await getOrderDetails(orderId);
  } catch (err) {
    res.send(err);
  }
  // Pull order id and purchaser name
  const { id, shipping_name } = orderDetails.data;

  // Find tax rate for order zip code
  try {
    taxRate = await findTaxRate(orderDetails.data.zip_code);
  } catch (err) {
    res.send(err);
  }

  orderDetails.data = new Order(id, shipping_name, taxRate.data);
  orderDetails.message = 'Successful lookup of Order details and Tax Rates';

  // calculateSubTotal

  res.send(orderDetails);
}

module.exports = {
  calculateOrderTotal,
};
