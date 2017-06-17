import React from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';


const Dropdown = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to='/app22'><MenuItem primaryText="FAQ" primary={true} /></Link>
  </IconMenu>
);

export default (props) => {
  console.log('Navprops', props)

  let obj = {}

  if (props.version === '3') obj.version =  'Ropsten'
  else if (props.version === '1') obj.version = 'Mainnet'

  const frozenNetwork = Object.freeze(obj)

return (<AppBar
  title="TimeBank"
  iconElementLeft={<Dropdown/>}
  iconElementRight={<div ><h1 style={{margin: 0, marginTop: 5, fontWeight: 400}}>{frozenNetwork.version || 'No Network Detected'}</h1></div>}
/>)
}