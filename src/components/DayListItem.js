import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {
  const {name, spots} = props;
  let formatSpots = (spots) => {
    let text = ""
    if (spots > 1) {
      text += `${spots} spots`;
    } else if (spots > 0) {
      text += `${spots} spot`;
    } else {
      text += `no spots`;
    }
    text +=  ` remaining`;
    return text;
  }
  
  let itemClass =  classNames(
    "day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": spots === 0
    })
  return (
    <li className={itemClass} data-testid="day" onClick={() => props.setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}