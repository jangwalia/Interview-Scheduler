import React from "react";
import { useState } from "react";
import 'components/Appointment/style.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
export default function Appointment(props){
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const{mode,transition,back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
 
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
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
          student={props.student}
          interviewer={props.interviewer}
      />
      )}
      {mode === CREATE && <Form interviewers = {props.interviewers} onCancel = {()=> {back()}} />}
    </article>
  );
}