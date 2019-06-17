import React from "react";
import { Redirect } from 'react-router-dom';
import vars from '../../vars';
import './LoginForm.css';
import ToRegistrationButton from "./ToRegistrationButton";

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
    if (email.length < 4 || email.slice(-4) !== ".edu") {
      alert("must use a .edu email!")
    } else {
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
          this.props.history.push("/games");
        } else {
          alert("Login failed");
        }
      });
    }
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit} className = 'LoginForm'>
      Account Login
        <label className = 'LoginLabel'>
          <div className = 'InputContainer'>
            Email:
            <input className = 'LoginInput' type="text" name = "email" value={this.state.email} onChange={this.handleChange} />
          </div>
        </label>
        <label className = 'LoginLabel'>
          <div className = 'InputContainer'>
            Password:
            <input className = 'LoginInput' type="password" name = "password" value={this.state.password} onChange={this.handleChange} />
          </div>
        </label>
        <input className = 'FormButton LoginInput' type="submit" value="Login" />

        <ToRegistrationButton {...this.props}/>
      </form>
    )
  }
}

export default LoginForm;
