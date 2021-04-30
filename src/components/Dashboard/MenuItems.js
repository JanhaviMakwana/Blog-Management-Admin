import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const menuItems = React.forwardRef((props, ref) => (
    <div ref={ref}>
        <MenuItem onClick={props.loginClickHandler}>Login</MenuItem>
        <MenuItem>Logout</MenuItem>
    </div>
));

export default menuItems;