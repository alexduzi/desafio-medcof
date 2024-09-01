import React from 'react';
// import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import NotFound from './not-found/NotFound';
import Tasks from './tasks/Tasks';
import Register from './register/Register';
import TasksEdit from './tasks/TasksEdit';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/:id" element={<TasksEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
