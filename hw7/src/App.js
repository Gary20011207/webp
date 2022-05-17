import './App.css';
import login from './Components/Login';
import username from './Components/UserName';
import password from './Components/Password';
import button from './Components/Button';

function App() {
  return (
    <div class="App">
      <div class='login'> {login()} </div>
      <div class='info'> {username()} </div>
      <div class='info'> {password()} </div>
      <div class='button'> {button()} </div>
    </div>
  );
}

export default App;