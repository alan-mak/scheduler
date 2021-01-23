import { useState, useEffect } from "react";

import {getSpotsForDay} from '../helpers/selectors'

const axios = require('axios')

function useApplicationData() {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  useEffect(() => {
    Promise.all([
      // https://localhost:8001 not needed due to proxy added in package.json
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      // Update what was got in the promise above
      setState(prev => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }))
    })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    // Find the day object using the name
    const day = state.days.find( obj => obj.name === state.day);

    //Repopulating array with state.days data
    const days = [...state.days];

    //Update with new spots data
    days[day.id - 1] = {
      ...state.days[day.id -1],
      spots: (getSpotsForDay(state, state.day) - 1)
    }
    //Supposed to send the data to api
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      // Logic that is updating the appointments and days components
      setState({ ...state, appointments, days })
    })
  }

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      setState({ ...state, appointments })
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // Find the day object using the name
    const day = state.days.find( obj => obj.name === state.day);

    //Repopulating array with state.days data
    const days = [...state.days];

    //Update with new spots data
    days[day.id - 1] = {
      ...state.days[day.id -1],
      spots: (getSpotsForDay(state, state.day) + 1)
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }))
  }

  return { cancelInterview, bookInterview, setDay, state, editInterview };
}

export default useApplicationData;