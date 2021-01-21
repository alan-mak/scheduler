import { useState } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (mode) => {
    console.log("LINE 7", mode)
    history.push(mode)
    console.log("HISTORY 9", history)
    setMode(mode);
  }
  const back = () => {
    history.pop();
    let last = history.length - 1;
    setMode(history[last])
    console.log("HISTORY 16", history[last])
  };
  return { mode, transition, back }
};

export default useVisualMode;