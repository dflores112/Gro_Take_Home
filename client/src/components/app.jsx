import React from 'react';
import axios from 'axios';
import Styles from './styled.jsx';

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
      <Styles.Form onSubmit={this.handleSubmit}>
        Enter Order ID
        <Styles.Input type="text" value={id} onChange={this.handleChange} />
        <Styles.Submit type="submit" value="Find Order" />
        <Styles.Totals>
          Order:
          {' '}
          {orderId}
        </Styles.Totals>
        <Styles.Totals>
          SubTotal:
          $
          {subtotal}
        </Styles.Totals>
        <Styles.Totals>
          Taxes:
          $
          {taxes}
        </Styles.Totals>
        <Styles.Totals>
          Total:
          $
          {total}
        </Styles.Totals>
        <Styles.Err>
          {err}
        </Styles.Err>
      </Styles.Form>
    );
  }
}

export default App;
