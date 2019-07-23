import React from 'react';
import { connect } from "react-redux";
import {changeGameType} from '../../actions/index';


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
      <div className = 'ChooseRaiseSizeButton' onClick = {() => {this.clickLogic()}}>
        {buttonText}
      </div>
    )
  }
}

const ChooseRaiseSizeButton = connect(null, mapDispatchToProps)(RawChooseRaiseSizeButton);
export default ChooseRaiseSizeButton;
