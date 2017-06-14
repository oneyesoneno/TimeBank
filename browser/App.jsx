import React from 'react'
import Homepage from './components/Homepage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


export default class App extends React.Component{


  render() {

    return (
      <MuiThemeProvider>
        <Homepage/>
      </MuiThemeProvider>)

  }
}