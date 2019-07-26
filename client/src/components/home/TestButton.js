import React from 'react';
import { connect } from "react-redux";
import { emitTest } from '../../actions/socket';

function mapDispatchToProps(dispatch) {
  return {
    emitTest: article => dispatch(emitTest(article))
  };
}

class RawTestButton extends React.Component{
  constructor(props) {
    super(props);
  }

  clickLogic() {
    this.props.emitTest();
  }

  render() {
    return (
      <button onClick = {() => this.clickLogic()}>
      Test
      </button>
    )
  }
}

const TestButton = connect(null, mapDispatchToProps)(RawTestButton);
export default TestButton;
