import React, { useState } from "react";
import { webClient } from "../util/config";
import { Input } from "./Input";
import { useDispatch } from 'react-redux';
import { login } from "../redux/slices/userSlice";
import { useNavigate } from 'react-router-dom';
import { API } from "../util/constants";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        "username": "",
        "password": ""
    });

    const [error, setError] = useState(false);

    const validateUser = () => {
        webClient.post(API.ENDPOINT_AUTHENTICATE_USER, inputs).then(response => {
            console.log(`${inputs.username} logged In`);
            dispatch(login(response.data));
            navigate('/Home');
        }).catch(error => {
            console.log(error);
            setError(true);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = inputs.username;
        const password = inputs.password;
        const res = validateUser();
        console.log(res);
    
    };

    const onChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    }

    return (
        <>
            <div className="login-container">
                <div className="logo-container">

                </div>
                <div className="login-form-container">
                    <form className="login-form" onSubmit={handleSubmit} method="POST">
                        <Input
                            id="input1" type="text" name="username" placeholder="username" value={inputs.username}
                            onChange={onChange} disabled={false} 
                        ></Input>
                        <Input
                            id="input2" type="password" name="password" placeholder="password" value={inputs.password}
                            onChange={onChange} disabled={false} 
                        ></Input>
                        <input type="submit" className="login-button" />
                    </form>
                    {error && <span class='text-danger'>Invalid credentials. Login failed</span>}
                    <a href="/SignUpPage">Signup</a>
                </div>
            </div>
        </>
    );
}

export default Login;