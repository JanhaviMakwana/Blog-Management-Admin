import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from '@material-ui/core/Container';
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

const NewBlog = (props) => {


    const classes = styles();
    const [category, setCategory] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [author, setAuthor] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
        /* console.log(event.target.value); */
    }

    const blogPostHandler = (event) => {
        event.preventDefault();
        const date = new Date().toString();
        const data = {
            title: title,
            description: desc,
            author: author,
            genre: category,
            userId: props.userId,
            creationTime: date
        }

        console.log(data);
        firebase.database().ref('/blogs').push(data).then(res => { console.log(res); })
        props.history.push('/user/my_blogs');
    }

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    const authorHandler = (event) => {
        setAuthor(event.target.value);
    }

    const descHandler = (event) => {
        setDesc(event.target.value);
    }
    /*  console.log("NewBlog"); */
    return (
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
                            label="Title"
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
                            label="Description"
                            autoComplete="desc"
                            autoFocus
                            onChange={descHandler}
                        />

                        
                        <InputLabel className={classes.label}>Category</InputLabel>
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
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    };
};


export default withRouter(connect(mapStateToProps, null)(NewBlog));
