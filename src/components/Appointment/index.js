import React from "react";
import 'components/Appointment/style.scss';
export default function Appointment(props){
  function checkTime(props){
    if(!props.time){
      return "No Appointment For Today"
    }
    else{
      return `Appointment at ${props.time} today`
    }
  }
  return (
    <article className="appointment">{checkTime(props)}</article>
  );
}