import React from "react";
import "./FieldErrorText.css";

const FieldErrorText = ({ err, children }) => {
  return <span className={`error-text ${err}`}>{children}</span>;
};

export default FieldErrorText;