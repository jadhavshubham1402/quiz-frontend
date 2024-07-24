// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './component/login';
import RegisterForm from './component/register';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
