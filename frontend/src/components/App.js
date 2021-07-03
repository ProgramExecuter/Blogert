import './app.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Home         from '../pages/home/Home.js';
import Login        from '../pages/login/Login.js';
import SignUp       from '../pages/signup/SignUp.js';
import Post         from '../pages/post/Post.js';
import User         from '../pages/user/User.js';
import EditPost     from '../pages/editPost/EditPost.js';
import CreatePost   from '../pages/createPost/CreatePost.js';
import Navbar       from './Navbar.js';
import Error        from './error/Error.js';
import EditUser     from '../pages/user/EditUser.js';
import isUserLogin  from '../utils/isUserLogin';

function App() {
  const user = isUserLogin();
  return (
      <div className="App">
        <Router>
          <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                {user ? <Redirect to="/" /> :<Login />}
              </Route>
              <Route exact path="/signup">
                {user ? <Redirect to="/" /> : <SignUp />}
              </Route>
              <Route path="/post/create">
                {user ? <CreatePost /> : <Redirect to="/login" />}
              </Route>
              <Route path="/post/:postId/edit">
                {user ? <EditPost /> : <Redirect to="/login" />}
              </Route>
              <Route path="/post/:postId">
                <Post />
              </Route>
              <Route path="/user/:username">
                <User />
              </Route>
              <Route path="/user/:username/edit">
                {user ? <EditUser /> : <Redirect to="/login" />}
              </Route>
              <Route path="*">
                <Error />
              </Route>
            </Switch>
        </Router>
      </div>
  );
};

export default App;
