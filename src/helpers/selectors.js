function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let result = []
  const filtered = state.days.filter(obj => obj.name === day);
  if (!Array.isArray(filtered) || !filtered.length) {
    return [];
  }
  const newFiltered = filtered[0].appointments.map(x => x)
  for (let obj in state.appointments) {
    for (let number of newFiltered) {
      if (number == obj) {
        result.push(state.appointments[obj])
      }
    }
  }
  return result;
}

function getInterviewersForDay(state, day) {
  const dayFound = state.days.find(obj => obj.name === day);
  if (!dayFound) {
    return [];
  }
  let interviewersFound = dayFound.interviewers.map(index => state.interviewers[index]);

  return interviewersFound;
}

function getInterview(state, day) {
  if (!day) {
    return null;
  }
  const result = { student: day.student }
  for (let interviewer in state.interviewers) {
    if (day.interviewer === state.interviewers[interviewer].id) {
      result["interviewer"] = state.interviewers[interviewer]
    }
  }
  return result;
}

function getSpotsForDay(state, dayName) {
  return state.days.find((day)=>{
      return day.name === dayName;
  })
  .appointments.filter(appointment => {
      return state.appointments[appointment].interview === null;
  }).length;
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview, getSpotsForDay }