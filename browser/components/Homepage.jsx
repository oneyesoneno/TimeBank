import React, {Component} from 'react';
import Web3 from 'web3'

import Menu from './Menu'
import Navbar from './Navbar'

export default class HomeContainer extends Component{
  constructor(props){
    super(props)
  }

  render(){

    return(
      <div>
        <Navbar/>
        <Menu />
      </div>
    )
  }
}





window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    setTimeout(function () {
      console.log(window.web3.eth.blockNumber)
    },5000)
  }

  // Now you can start your app & access web3 freely:


})