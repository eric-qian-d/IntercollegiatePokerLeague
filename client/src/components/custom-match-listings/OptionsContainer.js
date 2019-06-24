import React from 'react';
import NewMatchButton from "./NewMatchButton";
import GamesButton from './GamesButton';

class OptionsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {socket} = this.props;
    return (
      <div id = 'OptionsContainer'>
        <NewMatchButton socket = {socket}/>
        <GamesButton {...this.props} />
      </div>
    )
  }
}

export default OptionsContainer;
