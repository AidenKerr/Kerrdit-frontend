import { useState } from "react";
import Axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function Login(props) {

    const [errorMsg, setErrorMsg] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let response;
        try {
            response = await Axios.post('http://localhost:3001/api/login', {
                username: username, 
                password: password
            });
        } catch (e) {
            setErrorMsg("Log In Error");
            return;
        }
        
        

        // set state of user
        props.setUser(response.data.result);
        // store in localStorage
        localStorage.setItem('user', response.data.result);
        
        // redirect
        history.push('/');
    }

    return (
        <div className="login-form">
            <form>
                Log In
                <label>Username: <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}></input></label>
                <label>Password: <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}></input></label>
                <button onClick={handleSubmit}>Submit</button>
                <label className="error">{errorMsg}</label>
            </form>

            <Link to='/signup'>Sign Up</Link>
        </div>
    );
}

export default Login;