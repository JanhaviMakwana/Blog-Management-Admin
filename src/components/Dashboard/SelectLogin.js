import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

const SelectLogin = (props) => {

    const onLoginAdminSelect = () => {

        props.history.push('/admin/auth');
    }

    const onLoginUserSelect = () => {

        props.history.push('/user/auth');
    }

    return (
        <Dialog onClose={props.handleClose} open={props.open} onClick={props.onClose}>
            <Button onClick={onLoginAdminSelect}>Login as Admin</Button>
            <Button onClick={onLoginUserSelect}>Login as User</Button>
        </Dialog>
    );
};

export default withRouter(SelectLogin);