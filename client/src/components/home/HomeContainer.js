import React from "react";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("http://localhost:8081/login", {withCredentials: true, credentials: 'include'}, {
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
        Welcome
      </div>
    )
  }
}

export default HomeContainer;
