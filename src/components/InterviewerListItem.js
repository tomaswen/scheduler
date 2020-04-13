import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require("classnames");

export default function InterviewerListItem(props) {
  let interviewerItemClassName = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  let interviewerItemClassNameImg = classNames("interviewers__item-image", {
   "interviewers__item-image--selected": props.selected,
 });
  return (
    <li className={interviewerItemClassName} onClick={() =>props.setInterviewer(props.id)}>
      <img
        className={interviewerItemClassNameImg}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
