import React from 'react';
import NavbarItem from './NavbarItem';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
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

  homeFunction() {
    this.props.history.push('/');
  }

  rankingsFunction() {
    this.props.history.push('/rankings');
  }

  playFunction() {
    this.props.history.push('/choose-game');
  }

  signInFunction(obj) {
    console.log(obj);
    console.log(obj.props);
    obj.props.popUp = true;
  }

  signOutFunction() {
    this.props.history.push('/');
    fetch("http://localhost:8081/logout", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
      credentials : 'include',
      withCredentials : true,
    })
  }




  render() {
    console.log(this.props);
    const {loggedIn} = this.state;
    if (loggedIn) {
      return(
        <div className = 'Navbar'>
          <NavbarItem text = {'Home'} function = {this.homeFunction} {...this.props}/>
          <NavbarItem text = {'Rankings'} function = {this.rankingsFunction} {...this.props}/>
          <NavbarItem text = {'Play'} function = {this.playFunction} {...this.props}/>
          <NavbarItem text = {'Sign Out'} function = {this.signOutFunction} {...this.props}/>
        </div>
      )
    } else {
      return(
        <div className = 'Navbar'>
          
        </div>
      )
    }

  }
}

export default Navbar;
