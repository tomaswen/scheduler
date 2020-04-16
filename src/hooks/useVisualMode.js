import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory(prev => [...prev, newMode])
    } else {
      history[history.length - 1] = newMode;
    }
    setMode(newMode);
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } else {
      setMode(history[0]);
    }
  }

  return { mode, transition, back };
}
