import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route , Switch} from 'react-router'

import Homepage from './components/Homepage'
import SomePage from './components/SomePage'

import injectTapEventPlugin from 'react-tap-event-plugin';

import {spacing} from 'material-ui/styles/spacing'
import {cyan700, red500, grey600, fullWhite} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: cyan700,
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: '#CC181E',
    accent2Color: '#CC181E',
    accent3Color: '#FFFFFF', //affects slider color
    textColor: '#FFFFFF', //also affects color of icons
    secondaryTextColor: '#FFFFFF',
    alternateTextColor: '#FFFFFF', // color of Title text and Button text
    canvasColor: '#FFFFFF',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade('#FFFFFF',0.7), //color of disabled text field, both on field and the floating above
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
});

export default class App extends React.Component{


  render() {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div>
        <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/app22" component={SomePage} />
        </Switch>
        </div>
      </MuiThemeProvider>)

  }
}