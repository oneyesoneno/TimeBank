import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Route , Switch} from 'react-router'

import Homepage from './components/Homepage'
import SomePage from './components/SomePage'

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin()

export default class App extends React.Component{


  render() {

    return (
      <MuiThemeProvider>
        <div>
        <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/app22" component={SomePage} />
        </Switch>
        </div>
      </MuiThemeProvider>)

  }
}