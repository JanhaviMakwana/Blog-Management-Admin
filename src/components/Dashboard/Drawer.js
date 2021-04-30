import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
/* import DashboardIcon from '@material-ui/icons/Dashboard'; */
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    }

}));

const drawer = React.memo((props) => {

    const homeClickHandler = () => {
        props.history.push('/');
        props.onClick();
    }

    const addBlogClickHandler = () => {
        if (props.userId) {
            props.history.push('/user/add_blogs');
        } else {
            alert("Please Login !!!");
            props.history.push('/user/auth');
        }

        props.onClick();
    }

    const showMyBlogsHandler = () => {
        if (props.userId) {
            if (props.isAdmin) {
                props.history.push('admin/blogs')
            } else {
                props.history.push('/user/my_blogs');
            }
        } else {
            alert("Please Login !!!");
            // props.history.push('/auth');
        }

        props.onClick();
    }

    /* console.log("Drawer"); */
    return (
        <Drawer open={props.open} className={[useStyles.drawerPaper, !props.open && useStyles.drawerPaperClose].join(' ')}>
            <div>
                <IconButton onClick={props.onClick}>
                    <ChevronLeftIcon /> <Typography>BACK</Typography>
                </IconButton>
                <Divider />
                <List>
                    <ListItem button onClick={homeClickHandler}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={addBlogClickHandler}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Blog" />
                    </ListItem>
                    <ListItem button onClick={showMyBlogsHandler}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Blogs" />
                    </ListItem>
                </List>
                <Divider />
            </div>
        </Drawer>
    );
});

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        isAdmin: state.auth.isAdmin
    };
};

export default withRouter(connect(mapStateToProps, null)(drawer));