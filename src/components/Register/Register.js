import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import "./Register.css";

const Register = () => {
  return (
    <AuthForm
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
    />
  );
};

export default Register;