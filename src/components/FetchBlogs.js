import React from 'react';
import firebase from '../firebase';

class FetchBlogs extends React.Component {



    componentDidMount() {
        //const userId = 'O0bNez1bvMMEJINXTJRr6a1YSm03';
        const blogId = '-MY9WrC4ottBxZPqdNGi'
        firebase.database().ref(`blogs/${blogId}`).on('value', (snap) => {
            console.log(snap.val());
        })
        /* firebase.database().ref('blogs/').orderByChild('userId').equalTo(userId).once('value', (snap) => {
            console.log(snap.val());
        }) */
        const date = new Date();
        console.log(
            date.toString()
        );
        /* firebase.database().ref('/blogs').on('value', (snap) => {
            console.log(snap.val());
            const data = snap.val()
            const fetchBlogs = [];
            for (let key in snap.val()) {
                // console.log(key);

                fetchBlogs.push({
                    ...data[key],
                    id: key
                })

                //this.setState({ blogs: fetchBlogs, loading: false })
            }
            console.log(fetchBlogs);
        }) */
    }

    render() {
        return (
            <p>Fetching..</p>
        );

    }
};

export default FetchBlogs;