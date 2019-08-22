import React from "react";
import Navbar from '../navbar/Navbar';
import vars from '../../vars';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }


  

  render() {
    const {loggedIn} = this.state;
    return(
      <div>
        <Navbar {...this.props}/>
      </div>
    )
  }
}

export default HomeContainer;
