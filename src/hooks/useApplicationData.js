import { useState,useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state,setState] = useState({
    day : "Monday",
    days : [],
    appointments:{},
    interviewers : {}
  });
  const setDay = day => setState({ ...state, day });
  
  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all)=>{
      setState(prev => ({...prev,days:all[0].data,appointments:all[1].data,interviewers:all[2].data}));
      
    })
    
  },[])
 //function to change spots remaining
  function updateSpots(appointments){
    const selectedDay = state.days.find(day => day.name === state.day)
    const selectedAppointments = selectedDay.appointments.map(appointment => {
      return appointments[appointment].interview
    }).filter(interview => interview === null)
    selectedDay.spots = selectedAppointments.length
    const days = [...state.days].map(day => {
      if(day.name === state.day){
      return selectedDay
    } 
    return day
    })

    setState(prev =>({...prev,days}))
    }
  

//creating new appontment
function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.put(`/api/appointments/${id}`,{interview})
  .then(response =>{
    updateSpots(appointments);
    //console.log(response)
    setState(prev =>({...prev,appointments}))

  })   //setState(prev =>({...prev,appointments:response.data,id}))

}

//cancel interview
function cacelInterview(id){
  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
      ...state.appointments,
      [id]: appointment
  };

  return axios.delete(`/api/appointments/${id}`)
    .then(response => {
      updateSpots(appointments);
      setState(prev => ({...prev,appointments}))
    })    
}

return{
  state,
  setDay,
  bookInterview,
  cacelInterview
}

}
