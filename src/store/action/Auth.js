/* import axios from 'axios'; */
import firebase from '../../firebase';
import * as actionTypes from './actionTypes';

export const setAuthData = (email, token, userId) => {
    return {
        type: actionTypes.SET_AUTH_DATA,
        email: email,
        idToken: token,
        userId: userId
    };
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authUserSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_USER_SUCCESS,
        userId: userId,
        idToken: token
    };
};

export const authAdminSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_ADMIN_SUCCESS,
        userId: userId,
        idToken: token
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

/* export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}; */

export const authAdmin = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = null
        if (!isSignUp) {
            url = firebase.auth().signInWithEmailAndPassword(email, password)

        } else {
            url = firebase.auth().createUserWithEmailAndPassword(email, password)
        }
        url.then(res => {
            console.log(res);
            console.log(res.user.uid);
            localStorage.setItem('token', res.user.refreshToken);
            localStorage.setItem('userId', res.user.uid);
            localStorage.setItem('isAdmin', true);
            dispatch(authAdminSuccess(res.user.uid, res.user.refreshToken))
        })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err))
            })
    };
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = null
        if (!isSignUp) {
            url = firebase.auth().signInWithEmailAndPassword(email, password)
        } else {
            url = firebase.auth().createUserWithEmailAndPassword(email, password)
        }
        url.then(res => {
            console.log(res);
            console.log(res.user.uid);
            localStorage.setItem('token', res.user.refreshToken);
            localStorage.setItem('userId', res.user.uid);
            localStorage.setItem('isAdmin', false);
            dispatch(authUserSuccess(res.user.uid, res.user.refreshToken))
        })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err))
            })
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const isAdmin = localStorage.getItem('isAdmin');
            const userId = localStorage.getItem('userId');
            if (isAdmin) {
                console.log("Success");
                dispatch(authAdminSuccess(userId, token));
            } else {
                dispatch(authUserSuccess(userId, token));
            }
        }

    }
};

