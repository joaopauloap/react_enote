import React, { useContext, useEffect, useState } from "react";
import InputLabel from "../../components/InputLabel/InputLabel";
import Button from "../../components/Button/Button";
import axios from "axios";
import API_URLS from "../../config/apiUrls";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";
import "./Login.css";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  function handleLogin() {
    showAlert('Login successful!');

    axios
      .post(API_URLS.LOGIN, { email: email, password: password })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          onLogin(response.data);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
        showAlert("Login failed. Please try again." + error);
      });
  }

  function handleRegister() {
    try {
      axios
        .post(API_URLS.LOGIN, { email: email, password: password, name: name })
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            onLogin(response.data);
            navigate("/home");
          }
        });
    } catch (error) {
      console.log(error);
      showAlert("Register failed. Please try again." + error);
    }
  }

  return (
    <div className="login-container">
      <div className="form-panel">
        <h2>eShop</h2>
        {isLogin ? (
          <>
            <InputLabel
              labelValue="E-mail"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            <InputLabel
              labelValue="Senha"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="button-group">
              <Button id="btnLogin" value="Entrar" onClick={handleLogin} />
              <a href="#" onClick={() => setIsLogin(false)}>
                Cadastrar
              </a>
            </div>
          </>
        ) : (
          <>
            <InputLabel
              labelValue="E-mail"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            <InputLabel
              labelValue="Senha"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <InputLabel
              labelValue="Confirmar Senha"
              id="confirmPassword"
              type="password"
              onChange={handleConfirmPasswordChange}
            />
            <InputLabel
              labelValue="Nome"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
            <div className="button-group">
              <Button
                id="btnRegister"
                value="Cadastrar"
                onClick={handleRegister}
              />
              <a href="#" onClick={() => setIsLogin(true)}>
                Entrar
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
