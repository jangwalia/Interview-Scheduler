import React from "react";
import 'components/Appointment/style.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
export default function Appointment(props){
  function checkTime(props){
    if(!props.time){
      return "No Appointment For Today"
    }
    else{
      return `${props.time}`
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? 
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer.name}/>
        : 
        
        <Empty/>
      }
    </article>
  );
}