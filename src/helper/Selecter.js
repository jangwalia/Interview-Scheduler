
export  function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let result = [];
  const days = state.days;
  const appointments = state['appointments'];
  if(days.length === 0){
    return [];
  }
  for(const d of days){
    if(d['name'] === day){
      for(let a in appointments){
        if(d['appointments'].includes(appointments[a]['id'])){
          result.push(appointments[a])
        }
      }
    }
  }
  return result;
}


//STATE. INTERVIEWRS:
// 1: {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
//   },
// 2: {
//   id: 2,
//   name: "Tori Malcolm",
//   avatar: "https://i.imgur.com/Nmx0Qxo.png"
//   },

//APPOINTMENTS.INTERVIEWS

// 1: {
//   id: 1,
//   time: "12pm",
//   interview: { student: "Archie Cohen", interviewer: 2 }
//   },
//get interview object
export  function getInterview(state, interview){
  if(interview && interview.interveiwer){
    const interviewer = state.interviewers[interview.interveiwer]
    console.log(interviewer)
    return {...interview,interviewer}
  }
  return null;
 
}