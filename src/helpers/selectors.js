export function getAppointmentsForDay(state, day) {
  const filteredArray = state.days.filter((obj) => {
    return obj.name === day;
  });
  if (filteredArray.length === 0) {
    return [];
  } else {
    return filteredArray[0].appointments.map((appointment) => {
      return state.appointments[appointment];
    });
  }
}
