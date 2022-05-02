import { useState, useEffect } from "react";

export function useError(globalError) {
  const [globalErrorText, setGlobalErrorText] = useState("");
  useEffect(() => {
    switch (globalError) {
      case 400:
        setGlobalErrorText("Переданы некорректные данные пользователя.");
        break;
      case 401:
        setGlobalErrorText("Указан некорректный Email или пароль.");
        break;
      case 409:
        setGlobalErrorText("Пользователь с таким Email уже существует.");
        break;
      case 500:
        setGlobalErrorText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        alert(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        break;
      default:
        setGlobalErrorText("");
        break;
    }
  }, [globalError]);

  return globalErrorText;
}