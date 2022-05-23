import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './Log.css'



function EditExercise() {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const param = useParams().id;

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/api/exercises/${param}`)
        .then((res)=> {
            console.log(res.data);
            const data=res.data;
            setUsername(data.username);
            setDescription(data.description);
            setDuration(data.duration);
            setDate(new Date(data.date));
        })
        .catch((err)=> console.log(err));
    }, [param]);
    //whenever the id of exercise that is edited changes, new data is shown on screen

    function submit(e){
        e.preventDefault();
        const exercise={
            username,
            description,
            duration, 
            date
        };
        console.log(exercise);
        axios.patch(`${process.env.REACT_APP_API_URL}/exercises/edit/${param}`, exercise)
        .then((res)=> console.log(res.data));
        alert("Exercise Updated Successfully");
        setTimeout(() => {
            window.location = `${process.env.REACT_APP_API_URL}/`;
            window.location.reload();
          }, 1000);
    };
    function onChangeUsername(e){
        setUsername(e.target.value);
    }
    function onChangeDescription(e){
        setDescription(e.target.value);
    }
    function onChangeDuration(e){
        setDuration(e.target.value);
    }
    function onChangeDate(date){
        setDate(date);
    }
  return (
    <div className="whole-form">
        <h1> Edit Exercise </h1>
        <form onSubmit={submit}> 
        <div className="form-group">
        <label> Username: </label>
        <input
            required
            className="form-control"
            value={username}
            onChange={(e)=> onChangeUsername(e)}
        />
        </div>
        <div className="form-group"> 
        <label> Description: </label>
        <input
        required
        type="text"
        value={description}
        onChange={(e)=> onChangeDescription(e)}
        className="form-control"
        />
        </div>
        <div className="form-group">
            <label> Duration (in minutes): </label>
            <input
            required
            type="text"
            value={duration}
            className="form-control"
            onChange={(e)=> onChangeDuration(e)}
            />
        </div>
        <div className="form-group">
            <label> Date: </label>
            <DatePicker
            selected={date}
            onChange={date => onChangeDate(date)}/>
        </div>
        <br/>
        <button className="btn" type="submit" value="Create user"> Create Exercise </button>
        </form>
        </div>
  )
}

export default EditExercise;