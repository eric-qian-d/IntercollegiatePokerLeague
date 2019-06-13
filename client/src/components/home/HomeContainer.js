import React from "react";
import Navbar from '../navbar/Navbar';
import ''

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: false,
      loggedIn: false,
      popUpType: 'sign in'
    }
  }


  componentDidMount() {
    fetch("http://localhost:8081/loggedin", {withCredentials: true, credentials: 'include'}, {
    })
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }



  render() {

    const popUpDiv = [];
    if (this.state.loggedIn) {
      return(
        <div>
          <Navbar {...this.props}/>
        </div>
      )
    } else {

        if (this.state.popUp) {
          return(
            <div>
              <button className = 'LoginButton' onClick = {() => {this.setState({popUp: true})}}>
                Log In
              </button>
              Popping up
            </div>
          )
        } else {
          return(
            <div>
              <button className = 'LoginButton' onClick = {() => {this.setState({popUp: true})}}>
                Log In
              </button>
            </div>
          )
        }

    }
  }
}

export default HomeContainer;
