import * as actionTypes from '../action/actionTypes';

const initialState = {
    blogs: [],
    loading: false,
    posted: false
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_BLOG_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_BLOG_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.ADD_BLOG_SUCCESS:
            const newBlog = {
                ...action.blogData,
                id: action.blogId
            }
            console.log(state.blogs.concat(newBlog));
            return {
                ...state,
                loading: false,
                blogs: state.blogs.concat(newBlog)
            };
        case actionTypes.SET_FETCHED_BLOGS:
            return {
                ...state,
                blogs: action.blogData
            };
        case actionTypes.AUTH_LOGOUT_CLEANUP:
            return {
                ...state,
                blogs: []
            };
        default:
            return state;
    }
};

export default reducer;