import React from 'react';

class PlayerRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, place, ranking} = this.props;
    return (
      <div className = 'PlayerRanking'>
        {place}
        {name}
        {ranking}
      </div>
    )
  }
}

export default PlayerRanking;
