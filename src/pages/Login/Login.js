import React, { useContext, useState } from "react"
import InputLabel from "../../components/InputLabel/InputLabel"
import Button from "../../components/Button/Button"
import API_URLS from "../../config/apiUrls"
import { useNavigate } from "react-router-dom"
import { AlertContext } from "../../contexts/AlertContext"
import axiosInstance from "../../services/axiosInstance"
import "./Login.css"
import CONSTANTS from "../../config/constants"

function Login({ setUser }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { showAlert } = useContext(AlertContext)

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  function handleLogin() {
    if (email && password) {
      axiosInstance
        .post(API_URLS.LOGIN, { email: email, password: password })
        .then((response) => {
          console.log(response.data)
          if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data))
            setUser(response.data)
            navigate("/home")
          }
        })
        .catch((error) => {
          console.log(error)
          showAlert((error.response?.data || error.message).slice(0, 100));
        })
    }
  }
  return (
    <div className="login-container">
      <div className="form-panel">
        <div className="title-container">
          <h1>{CONSTANTS.TITLE}</h1>
          <h4>{CONSTANTS.SUBTITLE}</h4>
        </div>
        <div className="login-container-fields">
          <form>
            <InputLabel labelValue="E-mail" id="email" value={email} onChange={handleEmailChange} />
            <InputLabel labelValue="Senha" id="password" type="password" value={password} onChange={handlePasswordChange} />
          </form>
          <div className="button-group">
            <a href="" onClick={() => navigate('/register')}>ou cadastre-se</a>
            <Button id="btnLogin" value="Entrar" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
