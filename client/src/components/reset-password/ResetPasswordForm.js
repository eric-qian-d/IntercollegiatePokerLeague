import React from "react";
import { Redirect } from 'react-router-dom';
import vars from '../../vars';
import './ResetPasswordForm.css';
// import ToRegistrationButton from "./ToRegistrationButton";

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      temporaryPassword: "",
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
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/reset-password', {
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
        if (data.success) {
          this.props.history.push("/");
        } else {
          alert("Password reset failed");
        }
      });
    }
  }


  render() {
    return (
      <div id = 'ResetPasswordFormWrapper'>
      <form onSubmit={this.handleSubmit} id = 'ResetPasswordForm' >
        <div id = 'ResetPasswordTitle' className = 'FormTitle'>
          PokerZone
        </div>
        <div id = 'ResetPasswordDescription' className = 'FormDescription'>
          ResetPassword to your account
        </div>
        <label className = 'ResetPasswordLabel'>
          <div className = 'InputContainer'>

            <input className = 'ResetPasswordInput' type="text" name = "email" placeholder = 'Email' value={this.state.email} onChange={this.handleChange} />
          </div>
        </label>
        <label className = 'ResetPasswordLabel'>
          <div className = 'InputContainer'>

            <input className = 'ResetPasswordInput' type="password" name = "temporaryPassword" placeholder = 'Temporary Password' value={this.state.temporaryPassword} onChange={this.handleChange} />
          </div>
        </label>
        <input id = 'ResetPasswordButton' className = 'FormButton MediumDiv' type="submit" value="Reset Password" />
      </form>

      </div>
    )
  }
}

export default ResetPasswordForm;
