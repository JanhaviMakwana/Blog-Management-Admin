import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 320,
        minHeight: 250,
        marginTop: '6px',
        marginLeft: '11px',
        backgroundColor: '#aab6fe'
        /* backgroundColor: 'orange', */
    },
    title: {
        fontSize: 24,
        /*  backgroundColor: 'green', */
        marginBottom: '3px'
    },
    desc: {
        fontSize: 18,
        /* backgroundColor: 'red', */
        marginBottom: '3px'
    },
    author: {
        /*  backgroundColor: 'gray', */
        fontSize: 18,
        marginRight: '30px'
    },
    authorLogo: {
        fontSize: 28,
        paddingTop: '14px'
    },
    genre: {
        /* backgroundColor: 'brown', */
        marginBottom: '3px',
        color: 'black',
        paddingRight: theme.spacing(2),
    },
    quote: {
        fontWeight: '800px',
        fontSize: '28px'
    },
    equal: {
        fontSize: '18px',
        borderSpacing: '10px'
    },
    titleLogo: {
        fontSize: 28,
        paddingTop: '10px'
    }
}));

const Blog = (props) => {
    /*   console.log("Blog"); */
    const classes = useStyles();
    return (
        <Card className={classes.card} id={props.id} >
            <CardContent>
                <Typography className={classes.title} component="h2">
                    <CreateOutlinedIcon className={classes.titleLogo} /> {props.blog.title}
                </Typography>
                <Typography variant="body2" component="p" className={classes.desc}>
                    <span className={classes.quote}>"</span> {props.blog.description}<span className={classes.quote}>"</span>
                </Typography>
                <Typography className={classes.author}>

                    <PermIdentityIcon className={classes.authorLogo} />  {props.blog.author}
                </Typography>
                <Typography className={classes.genre}>
                    Genre<span className={classes.equal}>:</span>{props.blog.genre}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Blog

