import React, { useState } from 'react';
import { withRouter } from 'react-router';

import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../firebase';

const styles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '25px'

    },
    form: {
        width: '90%',
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: '10px',
        borderRadius: '10px'
    },
    valid: {
        borderBottom: '2px solid red'
    },
    label: {
        margin: '5px',
        padding: '10px',
        float: 'left'
    },
    select: {
        width: '200px',
        float: 'left'
    }
}));

const EditBlog = (props) => {
    const classes = styles();
    const blog = props.blog


    const [title = blog.title, setTitle] = useState();
    const [author = blog.author, setAuthor] = useState();
    const [desc = blog.description, setDesc] = useState();
    const [category, setCategory] = useState('');

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    const authorHandler = (event) => {
        setAuthor(event.target.value);
    }

    const descHandler = (event) => {
        setDesc(event.target.value);
    }

    const handleChange = (event) => {
        setCategory(event.target.value);
        /* console.log(event.target.value); */
    }

    const blogPostHandler = () => {
        firebase.database().ref('/blogs').child(props.id).update({
            title: title,
            author: author,
            description: desc,
            genre: category !== '' ? category : blog.genre
        })
        props.history.goBack();
    }

    let updateForm = null;

    if (blog) {
        updateForm = (
            <Container maxWidth="sm">
                <CssBaseline>
                    <div className={classes.paper}>
                        <form className={classes.form} onSubmit={blogPostHandler}>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="title"

                                value={title}
                                autoComplete="title"
                                autoFocus
                                onChange={titleHandler}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                multiline
                                rows={2}
                                fullWidth
                                id="desc"
                                value={desc}
                                autoComplete="desc"
                                autoFocus
                                onChange={descHandler}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="author"

                                value={author}
                                autoComplete="author"
                                autoFocus
                                onChange={authorHandler}
                            />
                            <InputLabel className={classes.label}>Category</InputLabel>
                            {blog.genre}
                            <Select
                                label="Selectjd"
                                value={category}
                                variant="outlined"
                                labelWidth={100}
                                onChange={handleChange}
                                className={classes.select}
                                name="select"
                                id="select"
                                autoFocus
                            >
                                <MenuItem value="social">Social</MenuItem>
                                <MenuItem value="science">Science</MenuItem>
                                <MenuItem value="music">Music</MenuItem>
                                <MenuItem value="quote">Quote</MenuItem>
                            </Select>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                POST
                        </Button>
                        </form>
                    </div>
                </CssBaseline>
            </Container>

        );
    }

    return (
        <Dialog onClose={() => props.updateSuccess} open={props.open} onClick={props.updateSuccess}>
            {updateForm}
        </Dialog>
    );
};

export default withRouter(EditBlog);