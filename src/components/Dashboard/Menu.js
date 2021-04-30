import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class MenuBar extends React.Component {
    loginClickHandler = () => {
        this.props.history.push('/auth');
    }

    render() {

        return (
            <Menu
                open={this.props.open}
                id="simple-menu"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                getContentAnchorEl={null}
                anchorEl={this.props.anchorEl}
                PaperProps={{
                    style: {
                        left: '50%',
                        transform: 'translateX(1%) translateY(46%)'
                    }
                }}
            >
                <MenuItem onClick={this.loginClickHandler}>Login</MenuItem>
                <MenuItem >Logout</MenuItem>
            </Menu>
        );
    }

}

export default withRouter(connect(null, null, null, { forwardRef: true })(MenuBar));