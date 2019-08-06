import React from "react";
import { render } from "react-dom";
import Card from "react-credit-cards";
import "../AppStyles/CardForm.css";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "../utils";
import "react-credit-cards/es/styles-compiled.css";
import NavBar from "../NavBar/NavBar";

const styles = {
  marginTop: '0%',
}

export default class App extends React.Component {
  constructor(props){
      super(props);
           
        this.state = {
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
        }
  };

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

    console.log("DEBUG: go to billing info button");
 
    this.form.reset();
    this.props.showBillingForm(formData);
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
   
    

    return (
      <div key="Payment">
        <NavBar/>
        <div className="App-payment form-pay" style={styles}>
          <h4 className="text-details">PAYMENT DETAILS</h4>
            <div className="row">
              <div className="col col-md-6 col-lg-6 col-sm-12 col-12">
              <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="number"
                name="amount"
                min="0"
                placeholder="Amount"
                required
                onChange={this.handleInputAmount}
              />
              <p className ="text-light">USD</p>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
             </div>
            <div className="form-group">
              <input
                type="tel"
                name="number"
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
                placeholder="Name on Card"
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
                  placeholder="MM / YY"
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
              <button className="btn btn-block text-center color-btn">Enter Billing Information</button>
              
            </div>
          </form>

              </div>

              <div className="col col-md-6 col-lg-6 col-sm-12 col-12">   
              <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
      
        </div>
      </div>
              </div>
            </div>
          
    );
  }
}

render(<App />, document.getElementById("root"));
