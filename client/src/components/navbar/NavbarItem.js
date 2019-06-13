import React from 'react';

class NavbarItem extends React.Component {
  constructor(props) {
    super(props);
    console.log('navbaritem');
    console.log(this.props);
    this.props.function.bind(this);
  }

  render() {
    const {text} = this.props;
    return (
      <button className = 'Button' onClick = {() => {this.props.function(this)}}>
        {text}
      </button>
    )
  }
}

export default NavbarItem;
