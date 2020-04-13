import React from "react";
import "components/DayListItem.scss";
const classNames = require("classnames");

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  
  const formatSpots = (spots) => {
    let spotMessage = "";
    spots
      ? spots > 1
        ? (spotMessage = spots + " spots remaining")
        : (spotMessage = "1 spot remaining")
      : (spotMessage = "no spots remaining");
    return spotMessage;
  };

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
