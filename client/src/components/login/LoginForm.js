import React from "react";
import { Redirect } from 'react-router-dom';
import vars from '../../vars';
import './LoginForm.css';
import ToRegistrationButton from "./ToRegistrationButton";
import ToResetPasswordButton from './ToResetPasswordButton';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/login', {
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
          alert("Login failed");
        }
      });
    }
  }


  render() {
    return (
      <div id = 'LoginFormWrapper'>
      <form onSubmit={this.handleSubmit} id = 'LoginForm' >
        <div id = 'LoginTitle' className = 'FormTitle'>
          PokerZone
        </div>
        <div id = 'LoginDescription' className = 'FormDescription'>
          Login to your account
        </div>
        <label className = 'LoginLabel'>
          <div className = 'InputContainer'>

            <input className = 'LoginInput' type="text" name = "email" placeholder = 'Email' value={this.state.email} onChange={this.handleChange} />
          </div>
        </label>
        <label className = 'LoginLabel'>
          <div className = 'InputContainer'>

            <input className = 'LoginInput' type="password" name = "password" placeholder = 'Password' value={this.state.password} onChange={this.handleChange} />
          </div>
        </label>
        <ToResetPasswordButton {...this.props}/>
        <input id = 'LoginButton' className = 'FormButton MediumDiv' type="submit" value="Login" />
        <ToRegistrationButton {...this.props}/>
      </form>

      </div>
    )
  }
}

export default LoginForm;
