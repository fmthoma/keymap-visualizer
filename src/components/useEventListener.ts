import { EventHandler, useEffect, useRef } from 'react';

export const useEventListener = (
  eventName: keyof WindowEventMap,
  handler: (event: any) => void,
) => {
  const savedHandler = useRef<EventHandler<any>>();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const eventListener = (event: any) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };
    window.addEventListener(eventName, eventListener);
    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};
