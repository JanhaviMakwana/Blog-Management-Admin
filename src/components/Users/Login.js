import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import * as actions from '../../store/action/Auth';

const styles = ((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '25px'

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    valid: {
        borderBottom: '2px solid red'
    }
}));

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: {
                    value: '',
                    valid: true,
                    isEmail: true,
                    touched: false
                },
                password: {
                    value: '',
                    valid: true,
                    minLength: 5,
                    touched: false
                },
            },
            isSignUp: false,
            submit: false,

        }
    };

    componentDidUpdate() {
        //console.log(this.state.isSignUp);
    }

    loginCloseHandler = () => {
        this.props.history.goBack();
    }

    signupClickHandler = () => {
        this.setState({ isSignUp: !this.state.isSignUp })
    }

    checkValidity = (value, type) => {
        let isValid = true;
        isValid = value.trim() !== '' && isValid;

        if (type === 'password') {
            const typeLength = this.state.form.password.minLength
            isValid = value.length >= typeLength && isValid;
        }

        if (type === 'email') {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    onChange = (event, type) => {
        const updatedForm = {
            ...this.state.form,
            [type]: {
                ...this.state.form[type],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, type),
                touched: true
            },

        }
        //console.log(event.target.value);
        this.setState({ form: updatedForm })
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.form.email.value, this.state.form.password.value, this.state.isSignUp);
        const interval = setTimeout(() => {
            this.props.history.push('/user');
            return clearInterval(interval);
        }, 3250)
    }
    render() {
        return (
            <Modal open={true} onClose={() => this.loginCloseHandler()}>
                <Container maxWidth="sm">
                    <CssBaseline>
                        <div className={this.props.classes.paper}>
                            <Avatar className={this.props.classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={this.props.classes.form} noValidate onSubmit={ev =>this.formSubmitHandler(ev)}>
                                <TextField
                                    className={this.state.form.email.valid ? null : this.props.classes.valid}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={ev => this.onChange(ev, 'email')}
                                />
                                <TextField
                                    className={this.state.form.password.valid ? null : this.props.classes.valid}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    inputProps={{
                                        minLength: 5,
                                        maxLength: 12
                                    }}
                                    autoComplete="current-password"
                                    onChange={ev => this.onChange(ev, 'password')}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={this.props.classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Button onClick={() => this.signupClickHandler()} >
                                    {!this.state.isSignUp ? " Don't have an account? Sign Up" : "Already have an account? Login"}
                                </Button>
                            </form>
                        </div>
                    </CssBaseline>
                </Container>
            </Modal>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, userId, isSignUp) => dispatch(actions.auth(email, userId, isSignUp)),
    };
};

export default withStyles(styles)(withRouter(connect(null, mapDispatchToProps)(Login)));