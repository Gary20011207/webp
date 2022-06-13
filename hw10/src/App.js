import './App.css';
import * as React from 'react';
import Personalpage from './User_Profile';
const {useState,useEffect}=React;
function App() {
  return (
    <div className="App">
      <Personalpage useState={useState} useEffect={useEffect}/>
    </div>
  );
}

export default App;