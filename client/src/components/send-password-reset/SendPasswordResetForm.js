import React from "react";
import { Redirect } from 'react-router-dom';
import vars from '../../vars';
import './SendPasswordResetForm.css';
import ToLoginButton from './ToLoginButton';

class SendPasswordResetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email, password} = this.state;
    if (email.length < 4 || email.toLowerCase().slice(-4) !== ".edu") {
      alert("must use a .edu email!")
    } else {
      this.state.email = this.state.email.toLowerCase();
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/users/send-password-reset', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
        credentials : 'include',
        withCredentials : true,
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.success) {
          this.props.history.push("/login");
        } else {
        }
      });
    }
  }


  render() {
    return (
      <div id = 'SendPasswordResetFormWrapper'>
      <form onSubmit={this.handleSubmit} id = 'SendPasswordResetForm' >
        <div id = 'SendPasswordResetTitle' className = 'FormTitle'>
          PokerZone
        </div>
        <div id = 'SendPasswordResetDescription' className = 'FormDescription'>
          Forgot your password? That's ok!
        </div>
        <label className = 'SendPasswordResetLabel'>
          <div className = 'InputContainer'>

            <input className = 'SendPasswordResetInput' type="text" name = "email" placeholder = 'Email' value={this.state.email} onChange={this.handleChange} />
          </div>
        </label>
        <input id = 'SendPasswordResetButton' className = 'FormButton MediumDiv' type="submit" value="Send Instructions" />
        <ToLoginButton {...this.props}/>
      </form>

      </div>
    )
  }
}

export default SendPasswordResetForm;
