import React from 'react';
import { connect } from "react-redux";
import {changeGameType} from '../../actions/index';
import './ChooseRaiseSizeButton.css';

function mapDispatchToProps(dispatch) {
  return {
    changeGameType: article => dispatch(changeGameType(article))
  };
}


class RawChooseRaiseSizeButton extends React.Component {
  constructor(props) {
    super(props);
  }

  clickLogic() {
    const {raiseSize} = this.props;
    this.props.changeGameType({ raiseSize : raiseSize });
  }

  render() {
    const {buttonText} = this.props;
    return(
      <button className = 'ChooseRaiseSizeButton DarkDiv' onClick = {() => {this.clickLogic()}}>
        {buttonText}
      </button>
    )
  }
}

const ChooseRaiseSizeButton = connect(null, mapDispatchToProps)(RawChooseRaiseSizeButton);
export default ChooseRaiseSizeButton;
