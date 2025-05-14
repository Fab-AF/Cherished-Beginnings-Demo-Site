import React from "react";
import "./Button.css";

const Button = ({ text, disabled=false ,onClick}) => {
  return (
    <>
      <button disabled={disabled} onClick={onClick} className="buttoncomp">{text}</button>
    </>
  );
};

export default Button;
