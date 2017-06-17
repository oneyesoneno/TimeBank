import React, {Component} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import PublicIcon from 'material-ui/svg-icons/social/public'


class Menu extends Component {
  constructor(props){
    super(props)


    this.state = {
      time: null,
      text: 'Use this input or slider',
      ropstenABI : [
        {
          "constant": true,
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "withdrawFunds",
          "outputs": [],
          "payable": false,
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_withdrawTime",
              "type": "uint256"
            }
          ],
          "name": "depositFunds",
          "outputs": [
            {
              "name": "_fundsDeposited",
              "type": "uint256"
            }
          ],
          "payable": true,
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getInfo",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "type": "function"
        }
      ],
      ropstenContractAddress : '0xb296af79bf8c567ee24055e39d6d0789c9f2e61d',
      liveABI : '',
      liveContractAddress: '',
      fundsToDeposit : 0,
      info: '',
      transaction: ''
    }

    this.handleSlider = this.handleSlider.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleETH = this.handleETH.bind(this)
    this.getInfoClick = this.getInfoClick.bind(this)
    this.depositFundsClick = this.depositFundsClick.bind(this)
    this.withdrawFundsClick = this.withdrawFundsClick.bind(this)

    this.getInfo = this.getInfo.bind(this)
    this.depositFunds = this.depositFunds.bind(this)
    this.withdrawFunds = this.withdrawFunds.bind(this)
  }

  handleSlider(event,value){
    console.log(value,'value')
    let days = (value * Date.now()/40000/86400).toFixed(2)

    this.setState({time: days * 86400, text: (value ? (days + ' days from now') : ' ')})
  }

  handleText(event){
    this.setState({text:event.target.value,time:Math.ceil(event.target.value * 86400)})
  }

  handleETH(event){
    this.setState({fundsToDeposit:window.web3.toWei(event.target.value,'ether')})
  }


  getInfoClick(){
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
    console.log('abi',abi)
    window.web3.eth.contract(abi).at(contractAddress).getInfo({from:window.web3.eth.accounts[0]},(err,result)=>{this.setState({info:window.web3.fromWei(result,'ether').toFixed(4) + ' ETH'})})
  }

  depositFundsClick() {
    let abi
    let contractAddress

    console.log('Time',this.state.time)
    console.log('Wei',this.state.fundsToDeposit)

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
        if (result) this.setState({transaction:result})
        else console.log('Error Message:', err)
    })

  }

  withdrawFundsClick(){
    let abi
    let contractAddress

    console.log('Time',this.state.time)
    console.log('Wei',this.state.fundsToDeposit)

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
        if (result) this.setState({transaction:result})
        else console.log('Error Message:', err)
      })

  }

  getInfo() {
    return   <div>
      <RaisedButton label="Get Info" primary={true} style={{marginRight:5}} onClick={this.getInfoClick} />
      <TextField
        disabled={true}
        hintText="Disabled Hint Text"
        floatingLabelText="ETH stored and future time"
        style={{flex:1}}
        value={" ex: 23.022345 ETH, 1497476174" && this.state.info}
      />
    </div>
  }

  depositFunds() {
    return        <div>
      <RaisedButton label="Store ETH" primary={true} style={{marginRight:5}} onClick={this.depositFundsClick} />
      <TextField
        hintText={this.state.text || 'Use this input or slider'}
        value={this.state.text}
        floatingLabelText="Days to access withdrawal"
        floatingLabelFixed={true}
        style={{marginLeft: 5}}
        onChange={this.handleText}
        onFocus={() => this.setState({text:' ',time:0})}
      />
      <TextField
        hintText="Amount of ETH to store"
        floatingLabelText="Doesn't include gas cost"
        floatingLabelFixed={true}
        style={{marginLeft: 5}}
        onChange={this.handleETH}
      />
      {this.state.transaction ? <a href={'https://ropsten.etherscan.io/tx/' + this.state.transaction}><PublicIcon style={{verticalAlign: 'middle', marginLeft:5}}/></a> : <div></div>}
      {this.state.transaction && this.props.version === '1' ? <a href={'https://etherscan.io/tx/' + this.state.transaction}><PublicIcon style={{verticalAlign: 'middle', marginLeft:5}}/></a> : <div></div>}

      <Slider defaultValue={0.5} sliderStyle={{marginBottom: 10}} onChange={(event, value) => this.handleSlider(event, value)}/>
    </div>
  }

  withdrawFunds() {
    return <div>
      <br/>
      <br/>
      <RaisedButton label="Withdraw Funds" primary={true} onClick={this.withdrawFundsClick}/>
      {this.state.transaction && this.props.version === '3' ? <a href={'https://ropsten.etherscan.io/tx/' + this.state.transaction}><PublicIcon style={{verticalAlign: 'middle', marginLeft:5}}/></a> : <div></div>}
      {this.state.transaction && this.props.version === '1' ? <a href={'https://etherscan.io/tx/' + this.state.transaction}><PublicIcon style={{verticalAlign: 'middle', marginLeft:5}}/></a> : <div></div>}
    </div>
  }

  emptyDiv () {
    return <div></div>
  }

  render(){

    console.log('MenuProps',this.props)

    return (
      <div id="insideMenu">

        {this[(this.props.choice || 'emptyDiv')]()}

      </div>
    )
  }
}

export default muiThemeable()(Menu)