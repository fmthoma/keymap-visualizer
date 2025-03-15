import { EventHandler, useEffect, useRef } from 'react';

export const useEventListener = (
  eventName: string,
  handler: (event: any) => void,
  element = window,
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
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
