import React from 'react';
import Blog from '../../Blogs/Blog/Blog';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router';
import firebase from '../../../firebase';

class ViewBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogId: '',
            blog: ''
        }
    }
    componentDidMount() {

        //const { match: { params } } = this.props;
        const { id, key } = (this.props.location && this.props.location.data) || {};
        console.log(key);
        // const { id } = params;
        // console.log(id);
        firebase.database().ref(`blogs/${key}`).on('value', (snap) => {
            this.setState({ blog: snap.val(), blogId: id })
            console.log(snap.val());
        })
    }

    onBackClickHandler = () => {
        this.props.history.push('/admin/blogs');
    }

    render() {
        let blog = <p>Loading...</p>
        if (this.state.blog !== '') {
            blog = <Blog blog={this.state.blog} id={this.state.blogId} />
        }
        return (
            <Container style={{ justifyContent: 'center', marginLeft: '100px', backgroundColor: 'red' }}>
                <Button onClick={this.onBackClickHandler}>BACK</Button>
                {blog}
            </Container>
        );
    }
};

export default withRouter(ViewBlog);