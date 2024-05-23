import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../redux/slices/userSlice";
import { webClient } from "../util/config";
import { API } from "../util/constants";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const [error, setError] = useState(false);

    const validateUser = async () => {
        try {
            const response = await webClient.post(API.ENDPOINT_AUTHENTICATE_USER, inputs);
            dispatch(login(response.data));
            navigate('/Home');
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateUser();
    };

    const onChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    }

    return (
        <div className="login-container">
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={inputs.username}
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={onChange}
                    />
                    <input type="submit" className="login-button" />
                </form>
                {error && <span className='text-danger'>Invalid credentials. Login failed</span>}
                <a href="/SignUpPage">Signup</a>
            </div>
        </div>
    );
}

export default Login;
