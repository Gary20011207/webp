import Header from "./Component/Header";
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Main from "./Main_Pages/Main";
import User from "./Main_Pages/User";
import Login from "./Main_Pages/Login";
import NewPost from "./Main_Pages/NewPost";
import Post from "./Main_Pages/Post";

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={ <Main /> }></Route>
        <Route exact path="/:id" element={ <Post /> }></Route>
        <Route path="/user" element={ <User /> }></Route>
        <Route path="/signin" element={ <Login /> }></Route>
        <Route path="/newpost" element={ <NewPost /> }></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;