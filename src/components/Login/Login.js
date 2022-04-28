import { React, createRef, useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useError } from "../../hooks/useError";
import "./Login.css";
import AuthForm from "../AuthForm/AuthForm";

const Login = ({ onLogin, globalError, isLoading }) => {
  const ref = createRef();
  const { values, handleChange, errors, isValid, setIsValid, setValues } = useFormWithValidation();
  const errorApi = useError(globalError);

  const handleSubmit = (event) => {
    const { email, password } = values;
    event.preventDefault();
    onLogin(
      {
        email,
        password,
      },
      () =>
        setValues({
          email: "",
          password: "",
        })
    );
  };

useEffect(() => {
  setIsValid(ref.current.checkValidity());
}, [setIsValid, ref]);

  return (
    <AuthForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      ref={ref}
      isValid={isValid}
      errors={errors}
      errorApi={errorApi}
      userEmail={values.email}
      userPassword={values.password}
      onSubmit={handleSubmit}
      onChange={handleChange}
      isLoad={isLoading}
    />
  );
};

export default Login;