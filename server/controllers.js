const { default: axios } = require('axios');

function getOrderDetails(orderID) {
  return axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/orders/${orderID}`);
}

function findTaxRate(zip) {
  axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/cities/${zip}`)
    .then((res) => res.data.tax_rate)
    .catch((err) => err);
}

function calculateOrderTotal(req, res) {
  const orderOutput = { Order: req.params.id };

  getOrderDetails(orderOutput.Order)
    .then((details) => {
      orderOutput['Customer Name'] = details.data.shipping_name;
      const taxRate = findTaxRate(details.data.shipping_city);
      res.send(details.data);
    })
    .catch((err) => {
      res.send(err);
    });
}

module.exports = {
  calculateOrderTotal,
};
