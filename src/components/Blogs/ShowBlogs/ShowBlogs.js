import React from 'react';
import Blog from '../Blog/Blog';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Spinner from '../../Spinner/Spinner';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import firebase from '../../../firebase';

const styles = ((theme) => ({
    blogGrid: {
        paddingBottom: '10px',
        marginTop: '1px'
    },
    emptyData: {
        width: '100px',
        fontSize: '100px',
        margin: '200px auto'
    }
}));


class ShowBlogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            loading: true
        }
    };

    componentDidUpdate() {
        //console.log(this.state.blogs);
    }

    componentDidMount() {
        // console.log("Mount");
        firebase.database().ref('/blogs').on('value', (snap) => {
            const data = snap.val()
            const fetchBlogs = [];
            for (let key in snap.val()) {
                fetchBlogs.push({
                    ...data[key],
                    id: key
                })
            }
            this.setState({ blogs: fetchBlogs, loading: false })
        })
    }
    render() {
        /* console.log("ShowBlogs"); */
        let blogs = <Spinner />;
        const myblogs = this.state.blogs;
        if (!this.state.loading) {
            if (this.state.blogs.length === 0) {
                blogs = <NotInterestedIcon className={this.props.classes.emptyData} />
            } else {
                blogs = myblogs.map(blog => {
                    return (
                        <Grid item md={3} key={blog.id} className={this.props.classes.blogGrid}>
                            <Blog blog={blog} />
                        </Grid>
                    );
                })
            }
        }

        return (
            <Grid container>
                {blogs}
            </Grid>
        );
    }
};

export default withStyles(styles)(ShowBlogs);