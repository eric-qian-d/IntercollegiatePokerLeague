import React from 'react';
import vars from '../../vars';

class VerifyEmailContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      emailVerificationId: '',
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
      fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/users/verify-email', {
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
          alert(data.status);
        }
      });
    }

  render() {
    return (
      <div id = 'VerifyEmailContainer'>
        <form  onSubmit={this.handleSubmit} id = 'RegistrationForm'>
          <label className = 'RegistrationLabel'>
            <input className = 'RegistrationInput' type="text" name = "emailVerificationId" placeholder = 'First Name' value={this.state.emailVerificationId} onChange={this.handleChange} />
          </label>
        <input id = 'RegistrationButton' className = 'FormButton MediumDiv' type="submit" value="Register" />
        </form>
      </div>
    )
  }
}

export default VerifyEmailContainer;
