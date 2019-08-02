import React from 'react';
import './SendPasswordResetPageContainer.css';
import SendPasswordResetForm from './SendPasswordResetForm'

class SendPasswordResetPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id = "SendPasswordResetPageContainer">
        <SendPasswordResetForm {...this.props} />


      </div>
    )
  }
}

export default SendPasswordResetPageContainer;
