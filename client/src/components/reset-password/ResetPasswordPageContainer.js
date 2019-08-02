import React from 'react';
import './ResetPasswordPageContainer.css';
import ResetPasswordForm from './ResetPasswordForm'

class ResetPasswordPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id = "ResetPasswordPageContainer">
        <ResetPasswordForm {...this.props} />


      </div>
    )
  }
}

export default ResetPasswordPageContainer;
