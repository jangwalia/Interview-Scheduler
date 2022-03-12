
export  function getAppointmentsForDay(state, day) {
 
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

//function to get Interviews
export  function getInterview(state, interview){
  if(interview && interview.interviewer){
    const interviewer = state.interviewers[interview.interviewer]
    console.log(interviewer)
    return {...interview,interviewer}
  }
  return null;
 
}

//GET INTERVIEWERS FOR DAY FUNCTION

export function getInterviewersForDay(state,day){
  if (state.days.length === 0) {
    return []
  }
  const getDay = state.days.filter(d => d.name === day)
  if (getDay.length === 0) {
    return []
  }
  return getDay[0].interviewers.map(i => state.interviewers[i])
}

