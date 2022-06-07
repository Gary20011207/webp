import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import ToDoList from './ToDoList';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const element =
  (
    <div id="root" class="root">
    <ToDoList />
    </div>
  )
  return(root.render(element));
}

export default App;