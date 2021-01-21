import { useState } from 'react';

function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory(history => [mode, ...history.slice(1)])
    } else {
      setHistory(history => [mode, ...history])
    }
  }
  const back = () => {
    if (history.length <= 1) {
      return;
    }
    setHistory(history => history.slice(1))
  };
  return { mode: history[0], transition, back }
};

export default useVisualMode;