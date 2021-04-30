import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import firebase from '../../../firebase';
import { DataGrid, GridColDef, GridCellParams } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditBlog from './EditBlog';

let id = 0;

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRows: [],
            open: false,
            selectedBlogId: '',
            blog: ''
        }
    }

    componentDidUpdate() {
        id = 0;
    }

    componentDidMount() {
        console.log(this.props.isAdmin);
        if (this.props.isAdmin) {
            firebase.database().ref('/blogs').on('value', (snap) => {
                const data = snap.val()
                const fetchBlogs = [];
                for (let key in snap.val()) {
                    fetchBlogs.push({
                        ...data[key],
                        key: key,
                        id: id + 1
                    })
                    id++;

                }
                this.setState({ dataRows: fetchBlogs })
            })
        } else {
            this.props.history.push('/admin/auth')
        }

    }

    deleteBlog = (id) => {
        firebase.database().ref(`/blogs/${id}`).remove()
            .then(res => { console.log(res); })
            .catch(err => { console.log(err); })
    };

    editBlog = (id) => {
        this.setState({ selectedBlogId: id, open: true })
        firebase.database().ref(`blogs/${id}`).on('value', (snap) => {
            this.setState({ blog: snap.val() })
        })
    }

    viewBlog = (blogId, blogKey) => {
        this.props.history.push({
            pathname: `/admin/blogs/${blogId}`,
            data: {
                id: blogId,
                key: blogKey
            }
        });
    }

    updateSuccess = () => {
        this.setState({ selectedBlogId: '', open: false });
        this.props.history.push('/admin/blogs')
    }

    columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: ' Title', width: 170 },
        { field: 'creationTime', headerName: 'Creation Time', width: 220 },
        { field: 'author', headerName: 'Author', width: 150 },
        {
            field: 'action-delete', headerName: 'Delete Blog', renderCell: (params: GridCellParams) => (
                <Button
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        //const api: GridApi = params.api
                        console.log(params.getValue('key'))
                        this.deleteBlog(params.getValue('key'))
                    }}

                > <DeleteIcon /></Button >
            ),
            width: 200,
        },
        {
            field: 'action-edit', headerName: 'Edit Blog', renderCell: (params: GridCellParams) => (
                <Button
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        //const api: GridApi = params.api
                        // console.log(params.getValue('key'))
                        this.editBlog(params.getValue('key'))
                        //deleteBlog(params.getValue('key'))
                    }}

                ><EditIcon /></Button >
            ),
            width: 200,
        },
        {
            field: 'action-view', headerName: 'View Blog', renderCell: (params: GridCellParams) => (
                <Button
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        //const api: GridApi = params.api
                        // console.log(params.getValue('key'))
                        this.viewBlog(params.getValue('id'), params.getValue('key'))
                        //deleteBlog(params.getValue('key'))
                    }}

                ><VisibilityIcon /></Button >
            ),
            width: 200,
        }
    ];



    render() {
        return (
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={this.state.dataRows} columns={this.columns} />
                <EditBlog open={this.state.open} id={this.state.selectedBlogId} blog={this.state.blog} />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAdmin: state.auth.isAdmin,
        userId: state.auth.userId
    }
};

export default withRouter(connect(mapStateToProps, null)(DataTable));