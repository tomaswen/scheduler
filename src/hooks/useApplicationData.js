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

  function dayIndexUsingDayName(state, day) {
    for (let dayKey in state.days) {
      if (state.days[dayKey].name === day) {
        return dayKey;
      }
    }
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: all });
    });
  }, []);

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
    const newState = { ...state, appointments };
    const newNumberOfSpots = calculateSpots(newState, state.day);
    newState.days[dayIndex].spots = newNumberOfSpots;

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
    const newState = { ...state, appointments };
    const newNumberOfSpots = calculateSpots(newState, state.day);
    newState.days[dayIndex].spots = newNumberOfSpots;

    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, newState });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}