import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import ExerciseList from './components/ExerciseList';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';


function App() {
  return (
    <Router> 
    <div className="container">
    
  <nav className="navbar">
  <h1 className="nav-header"> Exercise Logger </h1>
 <Link className="link" to="/"> Exercises </Link> 
  <Link className="link" to="/create"> Create New Exercise </Link> 
  <Link className="link" to="/user"> Create User </Link> 
  
    </nav>

    <br />
    <Routes>
    <Route exact path="/" element={<ExerciseList/>}/> 
    <Route path="/edit/:id" element={<EditExercise/>}/> 
    <Route path="/create" element={<CreateExercise/>}/> 
    <Route path="/user" element={<CreateUser/>}/> 
    <Route path="/delete" element={<ExerciseList/>}/> 
    </Routes>
    </div>
    </Router>
  );
}

export default App;



