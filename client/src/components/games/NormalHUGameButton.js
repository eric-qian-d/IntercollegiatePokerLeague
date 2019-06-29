import React from 'react';
import { connect } from "react-redux";

import vars from '../../vars';

import {addArticle} from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}

class RawNormalHUGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'NormalHUMatch'
    }
  }

  clickLogic() {
    //should redirect to /games when loading
    const {test} = this.state;
    this.props.addArticle({ test });
    // fetch(vars.protocol + '://' + vars.serverEndpoint + ':' + vars.port + '/api/choose-game/join-normal', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(this.state),
    //   credentials : 'include',
    //   withCredentials : true,
    // });
    // this.props.history.push('/games');
  }

  render() {
    return (
      <button id = 'NormalHUGameButton' className = 'ChooseGameTypeButton' onClick = {() => {this.clickLogic()}}>
        Normal Heads Up
      </button>
    )

  }
}

const NormalHUGameButton = connect(null, mapDispatchToProps)(RawNormalHUGameButton);

export default NormalHUGameButton;
