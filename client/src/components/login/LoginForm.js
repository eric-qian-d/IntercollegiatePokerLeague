import React from "react";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
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
      // fetch("http://localhost:8081").then(res => res.text()).then(res => console.log(res)).catch(err => err);
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
    // return (
    //   <Form className="form" onSubmit={this.handleSubmit}>
    //       <Col>
    //         <FormGroup>
    //           <Label>Email</Label>
    //           <Input
    //             type="email"
    //             name="email"
    //             id="exampleEmail"
    //             placeholder="myemail@email.com"
    //           />
    //         </FormGroup>
    //       </Col>
    //       <Col>
    //         <FormGroup>
    //           <Label for="examplePassword">Password</Label>
    //           <Input
    //             type="password"
    //             name="password"
    //             id="examplePassword"
    //             placeholder="********"
    //           />
    //         </FormGroup>
    //       </Col>
    //       <Button>Submit</Button>
    //     </Form>
    // )


    return (

      <form onSubmit={this.handleSubmit} className = 'LoginForm'>
      Account Login
        <label>
          <div className = 'InputContainer'>
            Email:
            <input type="text" name = "email" value={this.state.email} onChange={this.handleChange} />
          </div>
        </label>
        <label >
          <div className = 'InputContainer'>
            Password:
            <input type="password" name = "password" value={this.state.password} onChange={this.handleChange} />
          </div>
        </label>
        <input className = 'FormButton' type="submit" value="Login" />
      
        <ToRegistrationButton {...this.props}/>
      </form>
    )
  }
}

export default LoginForm;
