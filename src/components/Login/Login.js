import React from "react";
import "./Login.css";
import AuthForm from "../AuthForm/AuthForm";

const Login = () => {
  return (
    <AuthForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
    />
  );
};

export default Login;