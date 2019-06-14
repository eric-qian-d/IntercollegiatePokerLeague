import React from "react";
import { Redirect } from 'react-router-dom'

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
      // fetch("http://localhost:8081").then(res => res.text()).then(res => console.log(res)).catch(err => err);
      fetch("http://localhost:8081/login", {
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" name = "email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name = "password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Login" />
      </form>
    )
  }
}

export default LoginForm;
