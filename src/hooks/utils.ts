import { useEffect, useRef } from "react";

export const useTimeout = (callback: () => void, delay: number) => {
  const timer: { current: number | null } = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    timer.current = window.setTimeout(tick, delay);
    return () => window.clearTimeout(timer.current as number);
  }, [delay]);

  return timer;
};
