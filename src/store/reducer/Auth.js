import * as actionTypes from '../action/actionTypes';

const initialState = {
    userId: null,
    token: null,
    error: null,
    loading: false,
    isAdmin: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_DATA:
            return {
                ...state,
                userId: action.userId,
                token: action.idToken
            };
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_USER_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                isAdmin: false
            };
        case actionTypes.AUTH_ADMIN_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                isAdmin: true
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                error: null
            };
        default:
            return state;
    }
};

export default reducer;