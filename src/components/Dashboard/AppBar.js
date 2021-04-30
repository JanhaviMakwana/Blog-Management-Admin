import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../store/action/Auth';
import * as blogActions from '../../store/action/Blog';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SelectLogin from './SelectLogin';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    loginBtn: {
        color: 'white'
    }
}));


const AppBarComp = React.memo((props) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        if (props.token) {
            props.onLogout();
            props.history.push('/');
        } else {
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
        console.log("Clicked");
    }

    /* const loginClickHandler = () => {
        if (!props.userId) {
            props.history.push('/auth');
        } else {
            props.onLogout();
            props.onLogoutCleanup();
            props.history.push('/');
        }

    }; */

    const classes = styles();
    /* console.log("AppBar"); */



    return (
        <div>
            <AppBar position="absolute">
                <Toolbar className={classes.toolbarIcon}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={props.onClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        BLOG MANAGMENT SYSTEM
                    </Typography>
                    <Button onClick={handleClickOpen}>
                        <AccountCircleIcon style={{ color: 'white' }} />
                        <Typography className={classes.loginBtn} variant="h6">
                            {!props.token ? 'LOGIN' : 'LOGOUT'}
                        </Typography>
                    </Button>
                    <SelectLogin open={open} onClose={() => handleClose()} />
                </Toolbar>
            </AppBar>
            <Toolbar />

        </div>
    );

})

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        onLogoutCleanup: () => dispatch(blogActions.authLogoutCleanup())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBarComp));