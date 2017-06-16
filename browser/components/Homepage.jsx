import React, {Component} from 'react';
import Web3 from 'web3'

import Menu from './Menu'
import Navbar from './Navbar'
import Qualify from './Qualify'

export default class HomeContainer extends Component{
  constructor(props){
    super(props)

    this.state = {
      option : ''
    }

    this.revealChoice = this.revealChoice.bind(this)
  }

  revealChoice(cb) {
    this.setState({option: cb})
  }


  componentDidMount(){
    window.addEventListener('load', function() {

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
        console.log('METAMASK')
        console.log(window.web3.eth.getBlockNumber(function(err,result){console.log(result)}))
      } else {
        console.log('No injected web3, attempting to connect to local host')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        setTimeout(function () {
          console.log(window.web3.eth.blockNumber)
        },5000)
      }
    })
  }

  render(){

    return (
      <div>
        <Navbar/>
        <div id="belowNav">
          <Qualify id="qualify" choose={this.revealChoice} />
          <Menu id='menu' choice={this.state.option}/>

        </div>
      </div>
    )
  }
}





