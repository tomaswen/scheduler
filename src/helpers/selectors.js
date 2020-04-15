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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const interviewerID = interview.interviewer;
    let result = {
      ...interview,
      interviewer: state.interviewers[interviewerID],
    };
    return result;
  }
}
