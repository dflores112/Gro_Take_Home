const { default: axios } = require('axios');
const classes = require('./orderClass');

async function getOrderDetails(orderID) {
  const details = {};
  try {
    const res = await axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/orders/${orderID}`);
    details.status = 200;
    details.data = res.data;
    details.header = 'Content-Type:application/JSON';
    details.message = 'Succesful lookup of Order Details';
    return details;
  } catch (err) {
    details.status = 500;
    details.data = 'Error finding Order details';
    details.message = err;
    return details;
  }
}

async function findTaxRate(zip) {
  const details = {};
  try {
    const res = await axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/cities/${zip}`);
    details.status = 200;
    details.data = res.data.tax_rate;
    details.header = 'Content-Type:application/JSON';
    details.message = 'Succesful lookup of Tax Rate';
    return details;
  } catch (err) {
    details.status = 500;
    details.data = 'Error finding Tax Rate';
    details.message = err;
    return details;
  }
}

function calculateSubTotals(items, taxRate) {
}

async function calculateOrderTotal(req, res) {
  // Run lowercase function to ensure case sensitivity
  const id = req.params.id.toLowerCase();
  const orderDetails = await getOrderDetails(id);

  if (orderDetails.status === 500) res.send(orderDetails);
  const taxRate = await findTaxRate(orderDetails.data.zip_code);

  if (taxRate.status === 500) res.send(taxRate);

  orderDetails.data = new classes.Order(orderDetails.data.id,
    orderDetails.data.shipping_name, taxRate.data);
  orderDetails.message = 'Successful lookup of Order details and Tax Rates';
  res.send(orderDetails);
}

module.exports = {
  calculateOrderTotal,
};
