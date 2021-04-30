import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const add_blog_start = () => {
    return {
        type: actionTypes.ADD_BLOG_START
    };
};

export const add_blog_fail = (error) => {
    return {
        type: actionTypes.ADD_BLOG_FAIL,
        error: error
    };
};

export const add_blog_success = (id, blogData) => {
    return {
        type: actionTypes.ADD_BLOG_SUCCESS,
        blogId: id,
        blogData: blogData
    };
};

export const add_blog = (blogData, token) => {
    return dispatch => {
        dispatch(add_blog_start());
        axios.post('/blogs.json?auth=' + token, blogData)
            .then(response => {
                console.log(response);
                dispatch(add_blog_success(response.data.name, blogData));
            })
            .catch(error => {
                //console.log(error);
                dispatch(add_blog_fail(error));
            })
    };
};

export const setFetchedBlogs = (blogData) => {
    return {
        type: actionTypes.SET_FETCHED_BLOGS,
        blogData: blogData
    };
};

export const authLogoutCleanup = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_CLEANUP
    };
};