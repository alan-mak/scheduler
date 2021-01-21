import { useState } from 'react'

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const transition = (mode) => setMode(mode)
  return { mode, transition }
};

export default useVisualMode;