import React from 'react';
import {BrowserRouter, Routes, Route}
  from "react-router-dom";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<TodoList/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;