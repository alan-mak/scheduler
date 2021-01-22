import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"

import "components/Appointment/styles.scss"
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const interview = props.interview
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    console.log(interview)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => console.log(error))
  }

  function erase() {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => console.log(error.message))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => erase()}
        />)}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />)}
      {mode === SAVING && (
        <Status
          message={'Saving'}
        />)}
        {mode === DELETING && (
          <Status
          message={'Deleting'}
        />)}
    </article>
  )
}