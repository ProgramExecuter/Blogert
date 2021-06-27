import './app.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home       from '../pages/home/Home.js';
import Login      from '../pages/login/Login.js';
import SignUp     from '../pages/signup/SignUp.js';
import Post       from '../pages/post/Post.js';
import User       from '../pages/user/User.js';
import EditPost   from '../pages/editPost/EditPost.js';
import CreatePost from '../pages/createPost/CreatePost.js';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route path="/post/create">
              <CreatePost />
            </Route>
            <Route path="/post/:postId/edit">
              <EditPost />
            </Route>
            <Route path="/post/:postId">
              <Post />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="*">
              <h1>404</h1>
            </Route>
          </Switch>
      </Router>
    </div>
  );
};

export default App;
