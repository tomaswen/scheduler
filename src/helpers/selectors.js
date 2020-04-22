//Goes through state and matches with the day string and returns an array of appointments
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

//Returns the interview copy with an object of the interviewer information
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

// Returns an array of interviewers that are avalaible for the day
export function getInterviewersForDay(state, day) {
  const filteredArray = state.days.filter((obj) => {
    return obj.name === day;
  });
  if (filteredArray.length === 0) {
    return [];
  } else {
    return filteredArray[0].interviewers.map((appointment) => {
      return state.interviewers[appointment];
    });
  }
}
