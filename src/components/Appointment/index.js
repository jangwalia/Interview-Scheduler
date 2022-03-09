import React from "react";
import { useState } from "react";
import 'components/Appointment/style.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
export default function Appointment(props){
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const DELETING = "DElETING";
  const CONFIRM = "CONFORM";
  const EDIT = "EDIT";
  
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

  function deleting(){
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(response => transition(EMPTY));
    
  }

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview)
    .then(response => transition(SHOW))
  }
  return (
    <article className="appointment">
      <Header time={props.time}/>

      {mode === CONFIRM && 
      <Confirm 
        message="Are you sure you would like to delete?"
        onConfirm={deleting}
        onCancel={()=> {back()}}
      />}
      {mode === EMPTY && 
      <Empty 
      onAdd={() => transition(CREATE)} 
      />}
      {mode === SHOW && 
      <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>{transition(EDIT)}}
      />
      }
      {mode === EDIT && 
      <Form 
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers = {props.interviewers} 
      onSave = {save} 
      onCancel = {()=> {back()}} 
      />
      }
      
      {mode === CREATE &&
       <Form 
       
       interviewers = {props.interviewers} 
       onSave = {save} 
       onCancel = {()=> {back()}} 
       />}
      {mode === SAVING && 
      <Status  
      message = "Saving"
      />}
      {mode === DELETING && 
      <Status  
      message = "Deleting"
      />}
    </article>
  );
}