import React from "react";
import "./FieldErrorText.css";

const FieldErrorText = (props) => {
  return <span className={`error-text ${props.err ? props.err : ""}`}>{props.children}</span>;
};

export default FieldErrorText;