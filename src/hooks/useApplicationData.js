import { useEffect, useReducer } from "react";
import { getAppointmentsForDay } from "../helpers/selectors";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  //Calculates the number of spots remaining by checking array of interviews in day
  function calculateSpots(state, day) {
    const appointmentArray = getAppointmentsForDay(state, day);
    let spots = 0;
    appointmentArray.forEach((appointment) => {
      if (!appointment.interview) {
        spots++;
      }
    });
    return spots;
  }
  // returns the key for the day matching day string parameter
  function dayIndexUsingDayName(state, day) {
    for (let dayKey in state.days) {
      if (state.days[dayKey].name === day) {
        return dayKey;
      }
    }
  }
  //Fetches the data from server at load
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: all });
    });
  }, []);

  //Set day state
  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  function bookInterview(id, interview) {
    const dayIndex = dayIndexUsingDayName(state, state.day);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = { ...state, appointments }; //create a copy of state with new appointments array
    const newNumberOfSpots = calculateSpots(newState, state.day); // Calculate new number of spots 
    newState.days[dayIndex].spots = newNumberOfSpots; //and updates it on newState

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_INTERVIEW, newState });
    });
  }

  function cancelInterview(id) {
    const dayIndex = dayIndexUsingDayName(state, state.day);

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = { ...state, appointments }; //create a copy of state with new appointments array
    const newNumberOfSpots = calculateSpots(newState, state.day); // Calculate new number of spots 
    newState.days[dayIndex].spots = newNumberOfSpots; //and updates it on newState

    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, newState });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
