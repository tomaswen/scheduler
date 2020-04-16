import { useState, useEffect } from "react";
import { getAppointmentsForDay } from "../helpers/selectors";
const axios = require("axios");

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

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
  function dayIdUsingDayName(state, day) {
    for (let dayKey in state.days) {
      if (state.days[dayKey].name === day) {
        return dayKey;
      }
    }
  }

  function bookInterview(id, interview) {
    const dayID = dayIdUsingDayName(state, state.day);
    const numberOfSpotsBeforeAdd = calculateSpots(state, state.day);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const day = {
      ...state.days[dayID],
      spots: numberOfSpotsBeforeAdd - 1,
    };
    const days = [...state.days];
    days[dayID] = { ...day };

    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment).then(() => {
        setState({ ...state, days, appointments });
      })
    );
  }

  function cancelInterview(id) {
    const dayID = dayIdUsingDayName(state, state.day);
    const numberOfSpotsBeforeAdd = calculateSpots(state, state.day);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const day = {
      ...state.days[dayID],
      spots: numberOfSpotsBeforeAdd + 1,
    };
    const days = [...state.days];
    days[dayID] = { ...day };

    return Promise.resolve(
      axios.delete(`/api/appointments/${id}`).then(() => {
        setState({ ...state, days, appointments });
      })
    );
  }
  return { state, setDay, bookInterview, cancelInterview };
}
