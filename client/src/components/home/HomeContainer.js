import React from "react";
import Navbar from '../navbar/Navbar';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    fetch("http://localhost:8081/loggedin", {withCredentials: true, credentials: 'include'}, {
    })
    .then(response => response.json())
    .then(data => {
      if (!data.loggedIn) {
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return(
      <div>
        <Navbar/>
      </div>
    )
  }
}

export default HomeContainer;
