import React from "react";
import "./Die.css";
const Die = (props) => {
  return (
    <div
      className="die-face"
      style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
      onClick={props.onClick}
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
};

export default Die;
