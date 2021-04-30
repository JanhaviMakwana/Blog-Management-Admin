import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/action/Auth';
import Home from './components/Home';
import UserLogin from './components/Users/Login';
import AdminLogin from './components/Admin/Login';
import NewPost from './components/Blogs/NewBlog/NewBlog';
import ViewBlog from './components/Admin/ShowBlogs/Blog';
import MyBlogs from './components/Blogs/MyBlogs/MyBlogs';
import AdminShowBlogs from './components/Admin/ShowBlogs/ShowBlogs';
import ShowBlogs from './components/Blogs/ShowBlogs/ShowBlogs';
import FetchBlogs from './components/FetchBlogs';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import React from 'react';



class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="App" >
        <CssBaseline>
          <BrowserRouter>
            <Home />
            <Switch>
              <Route path='/fetch' exact component={FetchBlogs} />
              <Route path='/user/auth' exact component={UserLogin} />
              <Route path='/admin/auth' exact component={AdminLogin} />
              <Route path='/user/add_blogs' exact component={NewPost} />
              <Route path='/admin/blogs' exact component={AdminShowBlogs} />
              <Route path='/user/my_blogs' exact component={MyBlogs} />
              <Route path='/admin/blogs/:id' exact render={(props) => <ViewBlog {...props} />} />
              <Route path='/user' component={ShowBlogs} />
            </Switch>
          </BrowserRouter>
        </CssBaseline>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(null, mapDispatchToProps)(App);
