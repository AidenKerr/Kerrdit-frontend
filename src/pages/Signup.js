import { useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router";

function Signup() {

    const [errorMsg, setErrorMsg] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let response;
        try {
            response = await Axios.post('http://localhost:3001/api/signup', {
                username: username, 
                password: password
            });
        } catch (e) {
            setErrorMsg("Sign Up Error");
            return;
        }

        console.log(response);

        history.push('/login');
    }

    return (
        <div className="login-form">
            <form>
                Create New Account
                <label>Username: <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}></input></label>
                <label>Password: <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}></input></label>
                <button onClick={handleSubmit}>Submit</button>
                <label className="error">{errorMsg}</label>
            </form>
        </div>
    )
}

export default Signup;