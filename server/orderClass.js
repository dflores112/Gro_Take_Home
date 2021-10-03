class Order {
  constructor(order, customerName, taxRate) {
    this.order = order;
    this.customerName = customerName;
    this.taxRate = taxRate;
  }
}

module.exports = {
  Order,
};
