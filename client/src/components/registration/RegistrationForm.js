import React from "react";
import vars from '../../vars';
import './RegistrationForm.css';
import ToLoginButton from './ToLoginButton';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
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
    const {email, password, reenteredPassword} = this.state;
    if (email.length < 4 || email.slice(-4) !== ".edu") {
      alert("must use a .edu email!")
    }
    else if (password !== reenteredPassword) {
      alert("passwords don't match!")
    } else {
      console.log("submitting")
      console.log(JSON.stringify(this.state));
      // fetch("http://localhost:8081").then(res => res.text()).then(res => console.log(res)).catch(err => err);
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/registration', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      })
    }



  }

  render() {
    return (
      <form  onSubmit={this.handleSubmit} className = 'RegistrationForm'>
      Register
        <label className = 'RegistrationLabel'>
          First Name:
          <input className = 'RegistrationInput' type="text" name = "firstName" value={this.state.firstName} onChange={this.handleChange} />
        </label>
        <label className = 'RegistrationLabel'>
          Last Name:
          <input className = 'RegistrationInput' type="text" name = "lastName" value={this.state.lastName} onChange={this.handleChange} />
        </label>
        <label className = 'RegistrationLabel'>
          Email:
          <input className = 'RegistrationInput' type="text" name = "email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label className = 'RegistrationLabel'>
          Password:
          <input className = 'RegistrationInput' type="password" name = "password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <label className = 'RegistrationLabel'>
          Reenter password:
          <input className = 'RegistrationInput' type="password" name = "reenteredPassword" value={this.state.reenteredPassword} onChange={this.handleChange} />
        </label>
      <input type="submit" value="Register" />
      <ToLoginButton {...this.props}/>
      </form>
    )
  }
}

export default RegistrationForm;
