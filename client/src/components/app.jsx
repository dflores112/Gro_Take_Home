import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: '' };

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
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { id } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        Order ID:
        <input type="text" value={id} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
