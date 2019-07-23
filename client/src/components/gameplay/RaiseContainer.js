import React from 'react';
import RaiseButton from './RaiseButton';

class RaiseContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {socket} = this.props;
    return (
      <RaiseButton socket = {socket} />
    )
  }

}

export default RaiseContainer;
