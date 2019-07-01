import React from 'react';
import NewMatchButton from "./NewMatchButton";
import GamesButton from './GamesButton';
import PlayButton from './PlayButton';

class OptionsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {socket} = this.props;
    return (
      <div id = 'OptionsContainer'>
        <GamesButton {...this.props} />
        <PlayButton socket = {socket} />
        <NewMatchButton socket = {socket}/>

      </div>
    )
  }
}

export default OptionsContainer;
