import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home     from './components/Home/Home.js';
import Login    from './components/Auth/Login.js';
import SignUp   from './components/Auth/SignUp.js';
import Post     from './components/Post/Post.js';
import User     from './components/User/User.js';
import EditPost from './components/Post/EditPost.js';

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
            <Route path="/post/:postId">
              <Post />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/edit/:postId">
              <EditPost />
            </Route>
            <Route path="*">
              <h1>404</h1>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
