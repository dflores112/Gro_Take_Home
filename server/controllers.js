const { default: axios } = require('axios');
const classOrder = require('./orderClass');
const classRes = require('./responseClass');

async function getOrderDetails(orderID) {
  try {
    const res = await axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/orders/${orderID}`);
    return new classRes.Response(200, true, 'Order Details', res.data);
  } catch (err) {
    return new classRes.Response(500, false, 'Order Details', err);
  }
}

async function findTaxRate(zip) {
  try {
    const res = await axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/cities/${zip}`);
    const { tax_rate } = res.data;
    return new classRes.Response(200, true, 'Tax Rate', tax_rate);
  } catch (err) {
    return new classRes.Response(500, false, 'Tax Rate', err);
  }
}

function calculateSubTotals(items, taxRate) {
}

async function calculateOrderTotal(req, res) {
  // Run lowercase function to ensure case sensitivity
  const orderId = req.params.id.toLowerCase();
  const orderDetails = await getOrderDetails(orderId);

  if (orderDetails.status === 500) res.send(orderDetails);
  const { id, shipping_name } = orderDetails.data;

  const taxRate = await findTaxRate(orderDetails.data.zip_code);
  if (taxRate.status === 500) res.send(taxRate);

  orderDetails.data = new classOrder.Order(id, shipping_name, taxRate.data);

  orderDetails.message = 'Successful lookup of Order details and Tax Rates';

  // calculateSubTotal

  res.send(orderDetails);
}

module.exports = {
  calculateOrderTotal,
};
