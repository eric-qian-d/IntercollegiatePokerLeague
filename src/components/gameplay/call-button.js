import call from "../../../public/js/gameplay";


class CallButton extends React.Component {
  render() {
    return (
      <button className = "CallButton" onClick = {() => {call()}}>
    )
  }
}

export default CallButton;
