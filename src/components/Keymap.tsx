import { EventHandler, useEffect, useRef, useState } from 'react';
import { Key, KeyBinding, KeyLoc, Modifier } from './Key';

export type KeymapProps = {
  matrix: KeyLoc[];
  keys: KeyBinding[];
};

const zipWith =
  <A, B>(as: A[], bs: B[]) =>
  <C,>(f: (a: A, b: B, index: number) => C): C[] => {
    const res = [];
    for (let i = 0; i < Math.min(as.length, bs.length); i++) {
      res.push(f(as[i], bs[i], i));
    }
    return res;
  };

const useEventListener = (
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

export function Keymap(props: KeymapProps) {
  const [modifiers, setModifiers] = useState<Modifier[]>([]);

  useEventListener('keydown', (e: KeyboardEvent) => {
    console.log(e.code, 'down');
    switch (e.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        setModifiers(['Shift', ...modifiers]);
        break;
      case 'CapsLock':
      case 'Backslash':
        setModifiers(['Mod3', ...modifiers]);
        break;
      case 'IntlBackslash':
      case 'AltRight':
        setModifiers(['Mod4', ...modifiers]);
        break;
    }
  });
  useEventListener('keyup', (e: KeyboardEvent) => {
    console.log(e.code, 'up');
    switch (e.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        setModifiers(modifiers.filter((mod) => mod != 'Shift'));
        break;
      case 'CapsLock':
      case 'Backslash':
        setModifiers(modifiers.filter((mod) => mod != 'Mod3'));
        break;
      case 'IntlBackslash':
      case 'AltRight':
        setModifiers(modifiers.filter((mod) => mod != 'Mod4'));
        break;
    }
  });

  const keys = zipWith(
    props.matrix,
    props.keys,
  )((loc, binding, index) => (
    <Key
      loc={loc}
      binding={binding}
      mods={modifiers}
      key={index}
    />
  ));

  return <div style={{ position: 'relative' }}>{keys}</div>;
}
