import "components/Application.scss";
import DayList from "./DayList";
import React, { useState,useEffect } from "react";
import axios from "axios";
import Appointment from "./Appointment/index";


export default function Application(props) {
  const [day,setDay] = useState("Monday")
  const [days,setDays] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8001/api/days').then(response =>{
      setDays([...response.data]);
  })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:8001/api/appointments').then(appointments =>{
      Object.values(appointments).map(appointment => {
        return(
          <Appointment
          key={appointment.id}
          {...appointment}
        />
         
        )
      });
    })
  },[day])
  
  
return (
    <main className="layout">
    <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
  days = {days}
  value = {day}
  onChange = {setDay}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
</section>
<section className="schedule">
        
        <Appointment key="last" time="5pm" />
      </section>
</main>
);
}
