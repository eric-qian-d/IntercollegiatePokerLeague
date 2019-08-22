import React from 'react';
import './Navbar.css';
import vars from '../../vars';
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';

class Navbar1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
      loggedIn: false,
    }
  }

  componentDidMount() {
    fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/users/loggedin', {withCredentials: true, credentials: 'include'}, {
    })
    .then(response => response.json())
    .then(data => {
      this.setState({loggedIn: data.loggedIn});
    });
  }

  render() {
    const {loggedIn} = this.state;
    const gameLink = loggedIn ? <Nav.Link className = 'NavbarItem' href="/choose-game">Games</Nav.Link> : null;
    const logLink = loggedIn ?
    <Nav.Link className = 'NavbarItem' onClick = {()=> {
          fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/logout', {
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
              alert("Logout failed");
            }
          });
        }
      }>
      Logout
    </Nav.Link> :
    <Nav.Link className = 'NavbarItem' onClick = {()=> {
          this.props.history.push('/login')
        }
      }>
      Login
    </Nav.Link>

    return (

      <Navbar className = 'Navbar' collapseOnSelect expand="sm">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Container>
          <Nav className="mr-auto NavbarItems">
            <Nav.Link className = 'NavbarItem' href="/">Home</Nav.Link>
            {gameLink}
            <Nav.Link className = 'NavbarItem' href="/rankings">Rankings</Nav.Link>
            {logLink}
          </Nav>
          </Container>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
      </Navbar>

    )
  }
}

export default Navbar1;
