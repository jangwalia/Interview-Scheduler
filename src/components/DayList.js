import React from "react";
import DaysListItem from "./DayListItem";

const DayList = (props)=>{
  const days = props.days.map(day => {
    return( <DaysListItem 
        key = {day.id} 
        name= {day.name}
        spots = {day.spots}
        selected = {day.name === props.value}
        setDay = {props.onChange}
    />
    )
  });
    return (
      <ul>
        {days}
      </ul>
    )
  
    
   
  
}
export default DayList;