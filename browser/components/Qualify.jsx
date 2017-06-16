import React, {Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable'

import RaisedButton from 'material-ui/RaisedButton';

class Qualify extends Component {
  constructor(props) {
    super(props)
  }


  render() {

    console.log('props',this.props)

    return (
      <div id="insideQualify">
        <br/>
        <br />
        <RaisedButton label="Check on my current deposit" primary={true} onClick={() =>this.props.choose('getInfo')}/>
        <br/>
        <br/>
        <RaisedButton label="Deposit ETH for a fixed time" primary={true} onClick={() =>this.props.choose('depositFunds')}/><br/>
        <br/>
        <RaisedButton label="Withdraw my ETH right now" primary={true} onClick={() =>this.props.choose('withdrawFunds')}/>
      </div>
    )
  }
}

export default muiThemeable()(Qualify)