import React, { createRef, useEffect} from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useError } from "../../hooks/useError";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./Register.css";

const Register = ({ onRegister, globalError, isLoading }) => {
  const ref = createRef();
  const errorApi = useError(globalError);
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    setValues,
  } = useFormWithValidation();

  const handleSubmit = (e) => {
    const { name, email ,password } = values;
    e.preventDefault();
    onRegister(
      {
        name,
        email,
        password
      },
      () =>
        setValues({
          name: "",
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
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      ref={ref}
      isValid={isValid}
      errors={errors}
      userName={values.name}
      userEmail={values.email}
      userPassword={values.password}
      onSubmit={handleSubmit}
      onChange={handleChange}
      errorApi={errorApi}
      isLoad={isLoading}
    />
  );
};

export default Register;