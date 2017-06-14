import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';


const AppBarExampleIcon = () => (
  <AppBar
    title="I wrote this!1"
    iconElementLeft={<Dropdown/>}
  />
);

export default AppBarExampleIcon;


const Dropdown = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to='/app22'><MenuItem primaryText="How To"/></Link>
    <Link to='/app22'><MenuItem primaryText="About"/></Link>
  </IconMenu>
);