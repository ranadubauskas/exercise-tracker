import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
  return (
    <nav className="navbar">
    <Link to="/"> Exercises </Link>
    <Link to="/create"> Create New Exercise </Link>
    <Link to="/user"> Create User </Link>
    </nav>
  )
}

export default Navbar