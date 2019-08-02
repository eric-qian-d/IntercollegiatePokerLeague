import React from 'react';
import vars from '../../vars';
import Navbar from '../navbar/Navbar';
import './VerifyEmailContainer.css';


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
        alert(data.message);
        if (data.success) {

          this.props.history.push("/");
        } else {
        }
      });
    }

  render() {
    return (
      <div id = 'VerifyEmailContainer'>
        <Navbar  {...this.props}/>
        <div id = 'VerifyEmailFormContainer'>
          <div id = 'VerifyEmailHeader'>
            Verify your email address
          </div>
          <div id = 'VerifyEmailBody'>
            Please copy in the code that was sent to your email to verify your email. Once your email is verified, you will be associated with a school and ranked!
          </div>
          <form  onSubmit={this.handleSubmit} id = 'VerifyEmailForm'>
            <label className = 'VerifyEmailLabel'>
              <input className = 'VerifyEmailInput' type="text" name = "emailVerificationId" placeholder = 'Verification Code' value={this.state.emailVerificationId} onChange={this.handleChange} />
            </label>
          <input id = 'VerifyEmailButton' className = 'FormButton DarkDiv' type="submit" value="Verify Email" />
          </form>


          <div id = 'ResendEmailVerificationButtonContainer'>
            <div id = 'ResendEmailVerificationButton' onClick = {() => {
              fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/users/resend-email-verification', {
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
              });
            }}>
              Resend Verification Code
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VerifyEmailContainer;
