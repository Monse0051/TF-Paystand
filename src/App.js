import React from 'react';
import CardForm from '../src/components/CardForm/cardForm';
import './App.css';
import BillingAddress from './components/BillingAddress/BillingAddress';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleSection: 'card',
      formData: null,
    }

    this.showCardForm = this.showCardForm.bind(this);
    this.showBillingForm = this.showBillingForm.bind(this);
  }

  

  showCardForm = () => {
    this.setState ({visibleSection: 'card'}); 
  }

  showBillingForm = (payerRequest) => {
    this.setState ({visibleSection: 'billing', payerRequest: payerRequest });
    console.log(this.state);
    
    
  }

  render() {
  return (
    <div>
      {this.state.visibleSection === 'card' && <CardForm showBillingForm = {this.showBillingForm}/> }
      {this.state.visibleSection === 'billing' && <BillingAddress showCardForm = {this.showCardForm}/> }
      </div>
  );
}

}

export default App;
