import React, {Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import PublicIcon from 'material-ui/svg-icons/social/public'
import Snackbar from 'material-ui/Snackbar';


class Menu extends Component {
  constructor(props) {
    super(props)


    this.state = {
      time: null,
      text: 'Use this input or slider',
      snackOpen: false,
      ropstenABI: [{
        "constant": false,
        "inputs": [],
        "name": "withdrawFunds",
        "outputs": [],
        "payable": false,
        "type": "function"
      }, {
        "constant": false,
        "inputs": [{"name": "_withdrawTime", "type": "uint256"}],
        "name": "depositFunds",
        "outputs": [{"name": "_fundsDeposited", "type": "uint256"}],
        "payable": true,
        "type": "function"
      }, {
        "constant": true,
        "inputs": [],
        "name": "getInfo",
        "outputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "uint256"}, {"name": "", "type": "uint256"}],
        "payable": false,
        "type": "function"
      }],
      ropstenContractAddress: '0xCf9F3f8F8B5bf5Ed72bD3Fdb66c29E36675c9D2b',
      liveABI: [{"constant":false,"inputs":[],"name":"withdrawFunds","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_withdrawTime","type":"uint256"}],"name":"depositFunds","outputs":[{"name":"_fundsDeposited","type":"uint256"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"}],
      liveContractAddress: '0x459F90b6e8dc23bBF1fF4c2F22aa2149b4bd4CFf',
      fundsToDeposit: 0,
      info: '',
      depositTransaction: '',
      withdrawTransaction:'',
      disabledDeposit: false
    }

    this.handleSlider = this.handleSlider.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleETH = this.handleETH.bind(this)
    this.getInfoClick = this.getInfoClick.bind(this)
    this.depositFundsClick = this.depositFundsClick.bind(this)
    this.withdrawFundsClick = this.withdrawFundsClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)

    this.getInfo = this.getInfo.bind(this)
    this.depositFunds = this.depositFunds.bind(this)
    this.withdrawFunds = this.withdrawFunds.bind(this)
  }

  handleSlider(event, value) {
    let days = (value * Date.now() / 40000 / 86400).toFixed(2)

    this.setState({time: days * 86400, text: (value ? (days + ' days from now') : ' '), disabledDeposit: false})
  }

  handleText(event) {
    let num = Number((event.target.value.trim()).split(' ')[0])

    this.setState({
      text: event.target.value,
      time: Math.ceil(num * 86400),
      disabledDeposit: !(typeof num === 'number' && num > 0)
    })
  }

  handleETH(event) {
    this.setState({
      fundsToDeposit: window.web3.toWei(Number(event.target.value), 'ether'),
      disabledDeposit: !(event.target.value > 0)
    })
  }


  getInfoClick() {
    let abi
    let contractAddress

    if (this.props.version === '3') {
      abi = this.state.ropstenABI
      contractAddress = this.state.ropstenContractAddress
    }
    else if (this.props.version === '1') {
      abi = this.state.liveABI
      contractAddress = this.state.liveContractAddress
    }
    window.web3.eth.contract(abi).at(contractAddress).getInfo({from: window.web3.eth.accounts[0]}, (err, result) => {
      var result = result.toString().split(',')
      var futureDays
      if (!Number(result[1])) futureDays = 0
      else futureDays = ((result[1]-(Date.now()/1000))/86400).toFixed(2)

      this.setState({info: Number(window.web3.fromWei((result[0]), 'ether')).toFixed(4) + ' ETH, ' + futureDays + ' days from now'})
    })
  }

  depositFundsClick() {
    let abi
    let contractAddress

    console.log('Time', Math.ceil(Date.now() / 1000) + this.state.time)
    console.log('Wei', this.state.fundsToDeposit)

    if (this.props.version === '3') {
      abi = this.state.ropstenABI
      contractAddress = this.state.ropstenContractAddress
    }
    else if (this.props.version === '1') {
      abi = this.state.liveABI
      contractAddress = this.state.liveContractAddress
    }
    window.web3.eth.contract(abi).at(contractAddress).depositFunds(Date.now()/1000 + this.state.time,{from:window.web3.eth.accounts[0],value:this.state.fundsToDeposit},
      (err,result)=>{
        if (result) this.setState({depositTransaction:result, snackOpen:true})
        else console.log('Error Message:', err)
    })

  }

  withdrawFundsClick() {
    let abi
    let contractAddress


    if (this.props.version === '3') {
      abi = this.state.ropstenABI
      contractAddress = this.state.ropstenContractAddress
    }
    else if (this.props.version === '1') {
      abi = this.state.liveABI
      contractAddress = this.state.liveContractAddress
    }
    window.web3.eth.contract(abi).at(contractAddress).withdrawFunds({from:window.web3.eth.accounts[0]},
      (err,result)=>{
        if (result) this.setState({withdrawTransaction:result,snackOpen:true})
        else console.log('Error Message:', err)
      })

  }

  getInfo() {
    return <div>
      <RaisedButton label="Get Info" primary={true} style={{marginRight: 5}} onClick={this.getInfoClick}/>
      <TextField
        disabled={true}
        hintText="Disabled Hint Text"
        floatingLabelText="ETH stored and future time"
        style={{flex: 1}}
        value={" ex: 23.022345 ETH, 1497476174" && this.state.info}
      />
    </div>
  }

  depositFunds() {
    return <div>
      <RaisedButton label="Store ETH" primary={true} disabled={this.state.disabledDeposit} style={{marginRight: 5}}
                    onClick={this.depositFundsClick}/>
      <TextField
        hintText={this.state.text || 'Use this input or slider'}
        value={this.state.text}
        floatingLabelText="Days to access withdrawal"
        floatingLabelFixed={true}
        style={{marginLeft: 5}}
        onChange={this.handleText}
        onFocus={() => this.setState({text: ' ', time: 0})}
      />
      <TextField
        hintText="Amount of ETH to store"
        floatingLabelText="Doesn't include gas cost"
        floatingLabelFixed={true}
        style={{marginLeft: 5}}
        onChange={this.handleETH}
      />
      {this.state.depositTransaction && this.props.version === '3'? <a href={'https://ropsten.etherscan.io/tx/' + this.state.depositTransaction } target="_blank"><PublicIcon
          style={{verticalAlign: 'middle', marginLeft: 5}}/></a> : <div></div>}
      {this.state.depositTransaction && this.props.version === '1' ?
        <a href={'https://etherscan.io/tx/' + this.state.depositTransaction} target="_blank"><PublicIcon
          style={{verticalAlign: 'middle', marginLeft: 5}}/></a> : <div></div>}

      <Slider defaultValue={0.5} step={0.0000625} sliderStyle={{marginBottom: 10}}
              onChange={(event, value) => this.handleSlider(event, value)}/>
    </div>
  }

  withdrawFunds() {
    return <div>
      <br/>
      <br/>
      <RaisedButton label="Withdraw Funds" primary={true} onClick={this.withdrawFundsClick}/>

      {this.state.withdrawTransaction && this.props.version === '3' ?
        <a href={'https://ropsten.etherscan.io/tx/' + this.state.withdrawTransaction} target="_blank"><PublicIcon
          style={{verticalAlign: 'middle', marginLeft: 5}}/></a> : <div style={{position:'absolute'}}></div>}

      {this.state.withdrawTransaction && this.props.version === '1' ?
        <a href={'https://etherscan.io/tx/' + this.state.withdrawTransaction} target="_blank"><PublicIcon
          style={{verticalAlign: 'middle', marginLeft: 5}}/></a> : <div style={{position:'absolute'}}></div>}

    </div>
  }

  emptyDiv() {
    return <div></div>
  }

  handleRequestClose(){
    this.setState({
      snackOpen: false,
    });
  };

  render() {

    return (
      <div id="insideMenu">

        {this[(this.props.choice || 'emptyDiv')]()}
        <Snackbar
          open={this.state.snackOpen}
          message="New transaction generated! See Globe for details."
          autoHideDuration={7000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{backgroundColor:'#3b4095'}}
        />
      </div>
    )
  }
}

export default muiThemeable()(Menu)