import React, { useContext, useEffect, useState } from "react"
import InputLabel from "../../components/InputLabel/InputLabel"
import Button from "../../components/Button/Button"
import axios from "axios"
import API_URLS from "../../config/apiUrls"
import { useNavigate } from "react-router-dom"
import { AlertContext } from "../../contexts/AlertContext"
import RequestErrorHandler from "../../services/requestErrorHandler"
import "./Login.css"
import { UserContext } from "../../contexts/UserContext"

function Login() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const { showAlert } = useContext(AlertContext)
  const { setUser } = useContext(UserContext);

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

  function handleLogin() {
    axios
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
        showAlert(RequestErrorHandler(error))
      })
  }

  function handleRegister() {
      axios
        .post(API_URLS.REGISTER, { email: email, password: password, name: name })
        .then((response) => {
          console.log(response.data)
          if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data))
            setUser(response.data)
            navigate("/home")
          }
        })
    .catch((error) =>{
      console.log(error)
      showAlert(RequestErrorHandler(error))
    })
  }

  return (
    <div className="login-container">
      <div className="form-panel">
        <h2>eShop</h2>
        {isLogin ? (
          <>
          <form>
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
            </form>
            <div className="button-group">
              <a href="#" onClick={() => setIsLogin(false)}>ou cadastre-se</a>
              <Button id="btnLogin" value="Entrar" onClick={handleLogin} />
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
              <a href="#" onClick={() => setIsLogin(true)}>volte para Entrar</a>
              <Button id="btnRegister" value="Cadastrar" onClick={handleRegister}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Login
