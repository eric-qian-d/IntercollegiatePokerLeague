import React from "react";
import Navbar from '../navbar/Navbar';
import HULadderBoardContainer from './HULadderBoardContainer';

class RankingsContainer extends React.Component {
  constructor(props) {
    super(props);
  }


  // componentDidMount() {
  //   fetch("http://localhost:8081/loggedin", {withCredentials: true, credentials: 'include'}, {
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     if (!data.loggedIn) {
  //       this.props.history.push("/login");
  //     }
  //   });
  // }

  render() {
    return(
      <div className = 'RankingsContainer'>
        <Navbar/>
        <HULadderBoardContainer/>
      </div>
    )
  }
}

export default RankingsContainer;
