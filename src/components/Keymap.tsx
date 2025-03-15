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

export function Keymap({ matrix, keys: bindings }: KeymapProps) {
  const [modifiers, setModifiers] = useState<Modifier[]>([]);

  useEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        setModifiers(modifiers.includes('Shift') ? modifiers.filter(m => m !== 'Shift') : ['Shift', ...modifiers]);
        break;
      case 'CapsLock':
      case 'Backslash':
        setModifiers(modifiers.includes('Mod3') ? modifiers.filter(m => m !== 'Mod3') : ['Mod3', ...modifiers]);
        break;
      case 'IntlBackslash':
      case 'AltRight':
        setModifiers(modifiers.includes('Mod4') ? modifiers.filter(m => m !== 'Mod4') : ['Mod4', ...modifiers]);
        break;
      default:
        break;
    }
  });

  const keys = zipWith(
    matrix,
    bindings,
  )((loc, binding, index) => (
    <Key loc={loc} binding={binding} mods={modifiers} key={index} />
  ));

  return <div style={{ position: 'relative' }}>{keys}</div>;
}
