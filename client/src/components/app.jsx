import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '', orderId: '', subtotal: 0, taxes: 0, total: 0, err: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ id: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { id } = this.state;

    axios.get(`/api/orders/${id}`)
      .then((res) => {
        const {
          order, subTotal, taxes, total,
        } = res.data.data;
        this.setState({
          orderId: order, subtotal: subTotal, taxes, total, err: '',
        });
      })
      .catch((err) => {
        this.setState({ err: err.message });
      });
  }

  render() {
    const {
      id, subtotal, taxes, total, orderId, err,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        Order ID:
        <input type="text" value={id} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
        <div>
          Order:
          {' '}
          {orderId}
        </div>
        <div>
          SubTotal:
          {subtotal}
        </div>
        <div>
          Taxes:
          {taxes}
        </div>
        <div>
          Total:
          {total}
        </div>
        <div>
          {err}
        </div>
      </form>
    );
  }
}

export default App;
