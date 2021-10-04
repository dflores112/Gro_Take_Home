class Order {
  constructor(order, customerName, taxes, subTotal, total) {
    this.order = order;
    this.customerName = customerName;
    this.taxes = taxes;
    this.subTotal = subTotal;
    this.total = total;
  }
}

module.exports = {
  Order,
};
