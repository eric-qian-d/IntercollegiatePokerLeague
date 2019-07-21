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
      alert("Must use a .edu email!")
    }
    else if (password !== reenteredPassword) {
      alert("Passwords don't match!")
    } else {
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/users/registration', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.props.history.push("/");
        } else {
          alert(data.status);
        }
      });
    }



  }

  render() {
    return (
      <div id = 'RegistrationFormWrapper'>
        <form  onSubmit={this.handleSubmit} id = 'RegistrationForm'>
          <div id = 'RegistrationTitle' className = 'FormTitle'>
            PokerZone
          </div>
          <div id = 'RegistrationDescription' className = 'FormDescription'>
            Create an account
          </div>
          <label className = 'RegistrationLabel'>
            <input className = 'RegistrationInput' type="text" name = "firstName" placeholder = 'First Name' value={this.state.firstName} onChange={this.handleChange} />
          </label>
          <label className = 'RegistrationLabel'>
            <input className = 'RegistrationInput' type="text" name = "lastName" placeholder = 'Last Name' value={this.state.lastName} onChange={this.handleChange} />
          </label>
          <label className = 'RegistrationLabel'>
            <input className = 'RegistrationInput' type="text" name = "email" placeholder = 'Email' value={this.state.email} onChange={this.handleChange} />
          </label>
          <label className = 'RegistrationLabel'>
            <input className = 'RegistrationInput' type="password" name = "password" placeholder = 'Password' value={this.state.password} onChange={this.handleChange} />
          </label>
          <label className = 'RegistrationLabel'>
            <input className = 'RegistrationInput' type="password" name = "reenteredPassword" placeholder = 'Reenter Password' value={this.state.reenteredPassword} onChange={this.handleChange} />
          </label>
        <input id = 'RegistrationButton' className = 'FormButton MediumDiv' type="submit" value="Register" />
        <ToLoginButton {...this.props}/>
        </form>
      </div>
    )
  }
}

export default RegistrationForm;
