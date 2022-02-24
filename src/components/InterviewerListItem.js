import React from "react";
import 'components/InterviewerListItem.scss'
import classNames from "classnames";
export default function InterviewerListItem(props){
  const InterviewerClass = classNames('interviewers__item',{
    'interviewers__item--selected':props.selected
  })
  const checkName = (name)=>{
    if(props.selected){
      return name;
    }else {
      return "";
    }
  }
  return(
    <li onClick = {()=>props.setCurrentInterviewerID(props.id)} className={InterviewerClass}>
    <img
    className={InterviewerClass}
    src={props.avatar}
    alt={props.name}
  />
  {checkName(props.name)}
</li>
  );
}