import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import ZenGarden from './ZenGarden';


function App() {
  return (
    <BrowserRouter>
      <ZenGarden />
    </BrowserRouter>
  );
}

export default App;
