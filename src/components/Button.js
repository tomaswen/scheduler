import React from "react";
import "components/Button.scss";
const classNames = require("classnames");

export default function Button(props) {
  let btnClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });
  return (
    <button
      className={btnClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
