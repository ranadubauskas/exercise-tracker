import React, {useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import './Log.css';



function CreateExercise() {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers]= useState(["test-user"]);


    useEffect(()=> {
        axios.get(`${process.env.REACT_APP_API_URL}/users`)
        .then((res) => {
            const data=res.data
            console.log(data)
            setUsers(data.map((e)=>e.username))
            setUsername(data[0].username)
        })
        .catch(err => console.log(err))
    }, [])

    function onChangeUsername(e){
        setUsername(e.target.value);
    }
    function onChangeDescription(e){
        setDescription(e.target.value);
    }
    function onChangeDuration(e){
        setDuration(e.target.value);
    }
    function onChangeDate(e){
        setDate(date);
    }

    function onSubmit(e){
        e.preventDefault();
        const exercise = {
            username,
            description,
            duration,
            date,
        };
        console.log(exercise);
        axios.post(`${process.env.REACT_APP_API_URL}/exercises/create`, exercise)
        .then(res => console.log(res.data))
        alert('New Exercise Assigned Successfully!')
        setTimeout(() => {
            window.location = "/";
          }, 1000);
    }

  return (

    <div className="whole-form">
        <h1>Create A New Exercise Log: </h1>
        <form onSubmit={onSubmit}>
            <div className="form-group"> 
            <label> Username: </label>
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
            </div>
            <div className="form-group">
                <label> Description: </label>
                <input 
                    type="text"
                    required
                    value={description}
                    onChange={e => onChangeDescription(e)}
                    className="form-control"
                    />
            </div>
            <div className="form-group">
                <label> Duration (in minutes): </label>
                <input
                type="text"
                required
                value={duration}
                onChange={e => onChangeDuration(e)}
                className="form-control"
                />
            </div>
            <div className="form-group">
                <label> Date: </label>
                <div>
                    <DatePicker
                        selected={date}
                        onChange={date => onChangeDate(date)}
                        popperPlacement="bottom"
                        />
                    </div>
            </div> 
            <div className="form-group">
                <br/>
            <button className="btn" type="submit" value="Create user"> Create Exercise </button>
            </div>
        </form>
    
    </div>

  )
}

export default CreateExercise;