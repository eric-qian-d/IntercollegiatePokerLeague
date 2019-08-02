import React from "react";
import { Redirect } from 'react-router-dom';
import vars from '../../vars';
import './ResetPasswordForm.css';
// import ToRegistrationButton from "./ToRegistrationButton";

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      reenteredPassword: "",
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
    const {password, reenteredPassword} = this.state;
    if (password !== reenteredPassword) {
      alert("Passwords don't match!")
    } else {
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/users/reset-password', {
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
          this.props.history.push("/");
        } else {

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
          Set a new password
        </div>
        <label className = 'ResetPasswordLabel'>
          <div className = 'InputContainer'>
            <input className = 'RegistrationInput' type="password" name = "password" placeholder = 'Password' value={this.state.password} onChange={this.handleChange} />
          </div>
        </label>
        <label className = 'ResetPasswordLabel'>
          <div className = 'InputContainer'>
            <input className = 'RegistrationInput' type="password" name = "reenteredPassword" placeholder = 'Reenter Password' value={this.state.reenteredPassword} onChange={this.handleChange} />
          </div>
        </label>
        <input id = 'ResetPasswordButton' className = 'FormButton MediumDiv' type="submit" value="Reset Password" />
      </form>

      </div>
    )
  }
}

export default ResetPasswordForm;
