export function getAppointmentsForDay(state, day) {
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