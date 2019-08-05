import React from "react";
import { render } from "react-dom";
import Card from "react-credit-cards";
import "./styles.css";


import SupportedCards from "./Cards";


import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";


import "react-credit-cards/es/styles-compiled.css";

export default class App extends React.Component {
  state = {
    amount: "",
    currency: "",
    email: "",
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  };

  async postData(url = '', data = {}) {
    // Default options are marked with *
      const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json(); // parses JSON response into native JavaScript objects 
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputAmount = e => {
    const amount = e.target.value;
    this.setState({amount: amount});
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    console.log("pay button pressed!");
    
    const payerRequest = this.createPayerRequest(formData); 

    this.postData('http://192.168.100.46:3001/pay', payerRequest)
      .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
 
    this.form.reset();
  };

  createPayerRequest(formData){
    return {
      "amount": "5000.00",
      "currency": "USD",
      "card": {
        "nameOnCard": "Christopher",
        "cardNumber": "4242424242424242",
        "expirationMonth": "03",
        "expirationYear": "2020",
        "securityCode": "123",
        "billingAddress": {
          "street1": "41 Grandview St Unit C",
          "city": "Santa Cruz",
          "state": "CA",
          "postalCode": "95060",
          "country": "USA"
        }
      },
      "payer": {
        "name": "Christina C",
        "email": "cchen+test@paystand.com",
        "address": {
          "street1": "41 Grandview St Unit C",
          "city": "Santa Cruz",
          "state": "CA",
          "postalCode": "95060",
          "country": "USA"
        }
      }
    };
  }

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    return (
      <div key="Payment">
        <div className="App-payment">
          <h1>React Credit Cards</h1>
          <h4>Beautiful credit cards for your payment forms</h4>

          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="number"
                name="number"
                className="form-control"
                placeholder="Amount"
                required
                onChange={this.handleInputAmount}
              />
            </div>

            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />

            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button className="btn btn-primary btn-block">PAY</button>
            </div>
          </form>
      
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
