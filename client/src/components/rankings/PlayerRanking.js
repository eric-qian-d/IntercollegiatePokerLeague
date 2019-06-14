import React from 'react';

class PlayerRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, place, ranking, school} = this.props;
    return (
      <div className = 'PlayerRanking'>
        {place}
        {name}
        {school}
        {ranking}
      </div>
    )
  }
}

export default PlayerRanking;
