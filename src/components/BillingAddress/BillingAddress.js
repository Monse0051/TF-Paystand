import React from "react";
import {Form, Button} from "react-bootstrap";



export default class BillingAddress extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            Street:"",
            City:"",
            PostalCode:"",
            Country:"",
            Region:"",
        

        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log(this.state);
    
};


      

       render() {


        return (

<Form>
  <Form.Group >
    <Form.Control name="Street" type="text" placeholder="Street" onChange={this.handleInputChange} />
  </Form.Group>
  <Form.Group >
    <Form.Control name="City" type="text" placeholder="City" onChange={this.handleInputChange} />
  </Form.Group>
  <Form.Group >
    <Form.Control name="PostalCode" type="number" placeholder="Postal Code" onChange={this.handleInputChange} />
  </Form.Group>
  <Form.Group >
    <Form.Control name="Country" type="text" placeholder="Country"onChange={this.handleInputChange} />
  </Form.Group>
  <Form.Group >
    <Form.Control name="Region" type="text" placeholder="Region" onChange={this.handleInputChange}/>
  </Form.Group>
  <Button variant="primary" type="submit" onClick={this.handleClick}>
    Pay
  </Button>
  <Button variant="primary" type="submit" onClick={this.props.showCardForm}>
    Back
  </Button>
</Form>


    );
    }
 }