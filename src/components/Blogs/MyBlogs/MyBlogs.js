import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from '../../../axios';
import Blog from '../Blog/Blog';
import EditBlog from '../../Admin/ShowBlogs/EditBlog';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../../store/action/Blog';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Spinner from '../../Spinner/Spinner';
import firebase from '../../../firebase';
import EditIcon from '@material-ui/icons/Edit';

const styles = ({
    blogGrid: {
        paddingBottom: '10px'
    },
    emptyData: {
        width: '100px',
        fontSize: '100px',
        margin: '200px auto'
    }
});

class MyBlogs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myBlogs: [],
            loading: false,
            open: false,
            selectedBlog: '',
            selectedBlogId: ''
        }
    }

    componentDidMount() {
        console.log(this.props.blogs);
        console.log(this.props.userId);
        if (!this.props.userId) {
            this.props.history.push('/user/auth');
        } else {
            firebase.database().ref('blogs/').orderByChild('userId').equalTo(this.props.userId).once('value', (snap) => {
                console.log(snap.val());
                const data = snap.val()
                const fetchBlogs = [];
                for (let key in snap.val()) {
                    // console.log(key);

                    fetchBlogs.push({
                        ...data[key],
                        id: key
                    })
                    //console.log(fetchBlogs);
                    this.setState({ myBlogs: fetchBlogs, loading: true })
                }
            })
        }
    }

    deleteBlogHandler = (event, id) => {
        event.preventDefault();
        axios.delete(`/blogs/${id}.json`)
            .then(res => {
                /*  console.log(res); */
                this.fetchBlogData();
            }).catch(err => {
                /*  console.log(err); */
            })
    }

    editBlogHandler = (event, id) => {
        event.preventDefault();
        this.setState({ selectedBlogId: id, open: true })
        firebase.database().ref(`blogs/${id}`).on('value', (snap) => {
            this.setState({ selectedBlog: snap.val() })
        })
    }

    render() {
        let blogs = <Spinner />
        if (this.state.loading) {
            blogs = this.state.myBlogs.map(blog => {
                const id = blog.id
                return (
                    <Grid item md={3} key={blog.id} className={this.props.classes.blogGrid}>
                        <Blog blog={blog} />
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ width: '320px' }}
                            onClick={(ev) => this.deleteBlogHandler(ev, id)}>
                            <DeleteOutlineIcon />
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ width: '320px' }}
                            onClick={(ev) => this.editBlogHandler(ev, id)}>
                            <EditIcon />
                        </Button>
                    </Grid>
                );
            })
        }
        return (
            <Grid container>
                {blogs}
                <EditBlog open={this.state.open} id={this.state.selectedBlogId} blog={this.state.selectedBlog} />
            </Grid>
        );
    }
};


const mapStateToProps = state => {
    return {
        blogs: state.blog.blogs,
        loading: state.blog.loading,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetFetchedBlogs: (blogData) => dispatch(actions.setFetchedBlogs(blogData))
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(MyBlogs)));