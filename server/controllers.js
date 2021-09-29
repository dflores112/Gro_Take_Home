const { default: axios } = require('axios');

function getOrderDetails(orderID) {
  return axios.get(`https://code-challenge-i2hz6ik37a-uc.a.run.app/orders/${orderID}`);
}

function calculateOrderTotal(req, res) {
  const orderOutput = { Order: req.params.id };

  getOrderDetails(orderOutput.Order)
    .then((details) => {
      orderOutput['Customer Name'] = details.data.shipping_name;
      
      res.send(details.data);
    })
    .catch((err) => {
      res.send(err);
    });
}

module.exports = {
  calculateOrderTotal,
};
