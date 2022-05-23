import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './ExerciseList.css'


function ExerciseList() {
    const [exercises, setExercises] = useState([]);
    const [users, setUsers] = useState(["test-user"]);
    const [username, setUsername] = useState("");
        useEffect(()=> {
            axios.get(`${process.env.REACT_APP_API_URL}/users`)
            .then((res)=> {
                //console.log(res.data)
                const data=res.data
                setUsers(data.map((d)=>d.username))
                setUsername(data[0].username)
            })
            .catch(err=> console.log(err))
        }, []);
    
        useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/exercises`)
        .then((res)=> {
            //console.log(res.data);
            const data=res.data;
            setExercises(data);
            console.log(data);
        })
        .catch(err => console.log(err));
        }, []);

        function onChangeUsername(e){
            setUsername(e.target.value);
        }

        function deleteExercise(id){
            axios.delete(`${process.env.REACT_APP_API_URL}/exercises/` + id)
            .then(res => console.log(res.data))
            const newExercises = exercises.filter(e => e.id !== id);
            setExercises(newExercises);
            alert("Exercise Deleted Successfully");
        }
        function Exercise (props){
            return (
            <tr>
                <td> {props.exercise.username} </td>
                <td> {props.exercise.description} </td>
                <td> {props.exercise.duration} </td>
                <td> {props.exercise.date.substring(0,10)}</td>
                <td>
                <Link to={'/edit/'+ props.exercise._id}> Edit </Link> | <a href="delete" onClick={()=>deleteExercise(props.exercise._id)}> Delete </a>
                </td>
            </tr>
            )
        }
       

  return (
    <div className="all">
        <div className="top"> Exercises: </div>
        <br/>
        <form> 
    <label className="lb"> Select a user: </label>
        <select
            required
            className="form-control"
            type="text"
            value={username}
            onChange={onChangeUsername}
            >
                {
            users.map((user, ind) => (
            <option key={ind} value={user}>
                {user}
            </option>
             ))}
            </select>
            
        </form>
        <br/>
        <table className="table">
            <thead> 
            <tr>
                <th>Username</th> 
                <th>Description</th>
                <th>Duration </th>
                <th>Date </th> 
                <th>Actions </th>
            </tr>
            </thead>
            <tbody>
            {exercises.filter(ex => ex.username===username).map(ex => {
                return (
                    <Exercise exercise={ex} deleteExercise={deleteExercise} key={ex._id} />
                )
            })}
            </tbody>
            </table>



    </div>
  )
}

export default ExerciseList;

