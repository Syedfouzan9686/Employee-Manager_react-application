import React from 'react';
import logo from './logo.svg';
import './App.css';
import Employeelist from './Components/Employeelist';
import CreateEmployee from './Components/CreateEmployee';


function App() {
  return (
    <div className="App">
      {/* <Main/> */}
     <Employeelist/>
     {/* <CreateEmployee/> */}
    </div>
  );
}

export default App;
