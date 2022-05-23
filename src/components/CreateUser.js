import React, {useState} from 'react';
import axios from 'axios';
import './Log.css';


function CreateUser() {
    const [username, setUsername] = useState('');
    function onChangeUsername(e){
        setUsername(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault();
        const user = {
            username: username
        }
        console.log(user);
        axios.post(`${process.env.REACT_APP_API_URL}/users/add`, user)
        .then(res => console.log(res.data))
        alert('User Added Successfully!')
        setUsername('');
    };

  return (
    <div className="whole-form">
        <h1> Create New User </h1>
        <form onSubmit={onSubmit}>
        <div className="form-group">
        <label> Username: </label>
        <input
        type="text"
        required
        className="form-control"
        value={username}
        onChange={onChangeUsername}
        />
        </div>
        <br/>
        <div className="form-group">
            <button className="btn" type="submit" value="Create user"> Create User </button>
        </div>
        </form>
    </div>
  )
}

export default CreateUser;