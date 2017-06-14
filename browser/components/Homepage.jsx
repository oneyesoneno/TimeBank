import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const AppBarExampleIcon = () => (
  <AppBar
    title="I wrote this!1"
    iconElementRight={<Link to="app22"><FlatButton label="DJ Live"/></Link>}
  />
);

export default AppBarExampleIcon;