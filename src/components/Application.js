import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList"
import Appointment from 'components/Appointment'

const axios = require('axios');

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

  useEffect(() => {
    const URL = `/api/days`
    axios.get(URL)
    .then((response) => {
      setDays([...response.data])
    })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {days.map(appointment => {
          return <Appointment key={appointment.id} {...appointment}/>
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
