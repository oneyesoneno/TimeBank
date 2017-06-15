import React, {Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';


class Menu extends Component {
  constructor(props){
    super(props)

    this.state = {
      time: null,
      text: 'Use this input or slider'

    }

    this.handleSlider = this.handleSlider.bind(this)
    this.handleText = this.handleText.bind(this)
  }

  handleSlider(event,value){
    console.log(value,'value')
 
    this.setState({time: value, text: (value ? ((value * Date.now()/40000/86400).toFixed(2) + ' days from now') : 'Use input or slider')})
  }

  handleText(event){

    this.setState({time: Number(event.target.value), text: (event.target.value * Date.now()/40000/86400).toFixed(2) + ' days from now'})
  }

  render(){

    console.log('props',this.props.muiTheme.palette.textColor)
    return (
      <div className="menu">

        <div>
          <RaisedButton label="Get Info" primary={true} style={{marginRight:5}}/>
          <TextField
            disabled={true}
            hintText="Disabled Hint Text"
            defaultValue=" ex: 23.022345 ETH, 1497476174"
            floatingLabelText="ETH stored and future time"
            style={{flex:1}}
           />
        </div>

        <div style={{}}>
        <RaisedButton label="Store ETH" primary={true} style={{marginRight:5}}/>
        <TextField
          hintText={this.state.text || 'Use this input or slider'}
          value={(this.state.time && this.state.text) || undefined}
          floatingLabelText="Days to access withdrawal"
          floatingLabelFixed={true}
          style={{marginLeft: 5}}
          onFocus={() => this.setState({text:' ',time:0})}
          onBlur={() =>console.log('blurring')}
        />
          <TextField
            hintText="Amount of ETH to store"
            floatingLabelText="Doesn't include gas cost"
            floatingLabelFixed={true}
            style={{marginLeft: 5}}
          />
          <Slider defaultValue={0.5} sliderStyle={{marginBottom: 10}} onChange={(event, value) => this.handleSlider(event, value)}/>
        </div>

        <RaisedButton label="Withdraw Funds" primary={true}/>
      </div>
    )
  }
}

const StyledMenu = muiThemeable()(Menu)

export default StyledMenu

//floatingLabelText="Floating Label Text"