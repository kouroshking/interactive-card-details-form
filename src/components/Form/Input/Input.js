import React from "react";

import "./style.css";

const Input = ({ type, name, placeholder, error, ...rest }) => {
  return (
    <>
      <input
        className={error[0] ? "error" : ""}
        name={name}
        id={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
};

export default Input;
