import React from "react";
import {Button} from "react-bootstrap";
import Swal from 'sweetalert2';
import "../AppStyles/BillingAddress.css";


export default class BillingAddress extends React.Component {
    constructor(props) {
      super(props);

      this.state= {
            Street:"",
            City:"",
            PostalCode:"",
            Country:"",
            Region:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitPayment = (e) => {
    e.preventDefault();
    console.log(this.state);
    console.log("DEBUG: card Info:");
    console.log(this.props.cardInfo);

    const billingInfo = this.state;
    const payerRequest = this.createPayerRequest(this.props.cardInfo, billingInfo);
    this.postData('https://talentfest-paystand.herokuapp.com/pay', payerRequest)
      .then(data => {
        console.log("DEBUG: successful transaction!");
        console.log(JSON.stringify(data));
        if (data.result) {
          Swal.fire({
            type: 'success',
            title: 'Successful payment transaction!',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Error in transaction!',
          })
        }
      }) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
};

createPayerRequest(cardInfo, billingInfo){

  return {
    "amount": cardInfo.amount,
    "currency": "USD",
    "card": {
      "nameOnCard": cardInfo.name,
      "cardNumber": cardInfo.number,
      "expirationMonth": "03",
      "expirationYear": "2020",
      "securityCode": cardInfo.cvc,
      "billingAddress": {
        "street1": billingInfo.Street,
        "city": billingInfo.City,
        "state": billingInfo.Region,
        "postalCode": billingInfo.PostalCode,
        "country": billingInfo.Country
      }
    },
    "payer": {
      "name": cardInfo.name,
      "email": cardInfo.email,
      "address": {
        "street1": billingInfo.Street,
        "city": billingInfo.City,
        "state": billingInfo.Region,
        "postalCode": billingInfo.PostalCode,
        "country": billingInfo.Country
      }
    }
  };
}

async postData(url = '', data = {}) {
  // Default options are marked with *
    const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data),
  });
  return await response.json(); // parses JSON response into native JavaScript objects 
}



  render() {
    let cardBank = global.Payment.fns.cardType('4242 4242 4242 4242');  
    
    
    return (

      <form className= "form-billing"onSubmit={this.onSubmitPayment}>
        <span className= "text-light">{this.props.cardInfo.amount}</span>
        <span>
          <p className= "text-light">Billing address for:</p>
          <p className= "text-light">{this.props.cardInfo.name}</p>
          <p className= "text-light">{cardBank} {this.props.cardInfo.number.slice(14,19)}</p>
          <p className= "text-light">{this.props.cardInfo.expiry}</p>
        </span>
        <div className="form-group">
              <input
                name="Street" 
                type="text" 
                placeholder="Street" 
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                name="City" 
                type="text" 
                placeholder="City" 
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                name="PostalCode" 
                type="number" 
                placeholder="Postal Code" 
                onChange={this.handleInputChange}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  name="Country"
                  type="text" 
                  placeholder="Country" 
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col-6">
                <input
                  name="Region" 
                  type="text" 
                  placeholder="Region" 
                  onChange={this.handleInputChange}
                />
              </div>
              <Button 
              variant="primary" 
              type="submit" 
              onClick={/*this.handleClick*/ null}>
                 Pay
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                onClick={this.props.showCardForm}>
                  Back
              </Button>
            </div>
            <input type="hidden" name="issuer" value=""/>
      
              
              </form>


    );
  }
}