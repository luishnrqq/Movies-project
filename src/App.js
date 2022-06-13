import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Lista from './components/Lista';

function App() {
  return (
    <div className="App">
    <Provider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lista/>} />

      </Routes>
      </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
