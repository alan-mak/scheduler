import { useState } from 'react';

function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    if (replace) {
      // If replace we put the new mode then replace the last used mode
      setHistory(history => [mode, ...history.slice(1)])
    } else {
      // Putting the new mode at the beginning of the array
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