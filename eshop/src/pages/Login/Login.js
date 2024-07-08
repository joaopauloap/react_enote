import React, { useState } from "react";
import InputLabel from "../../components/InputLabel/InputLabel";
import Button from "../../components/Button/Button";
import axios from "axios";
import API_URLS from "../../config/apiUrls";
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleLogin() {
        try {
            await axios.post(API_URLS.LOGIN, { email: email,password: password})
            .then(response => {
                console.log(response.data)
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    onLogin(response.data); 
                    navigate('/home');
                }
            });

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div className="login-container">
            <div className="form-panel">
                <h2>eShop</h2>
                <InputLabel labelValue="E-mail" id="email" value={email} onChange={handleEmailChange}></InputLabel>
                <InputLabel labelValue="Senha" id="password" type="password" value={password} onChange={handlePasswordChange}></InputLabel>
                <Button id="btnLogin" value="Entrar" onClick={handleLogin}></Button>
            </div>
        </div>
    );
}

export default Login;