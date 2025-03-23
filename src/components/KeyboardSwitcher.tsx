import { useEffect, useState } from "react";
import { useEventListener } from "./useEventListener";
import { Ergodox } from "./Ergodox";
import { Crkbd } from "./Crkbd";

type Keyboard = 'Crkbd' | 'Ergodox';

const availableKeyboards: Keyboard[] = ['Crkbd', 'Ergodox']

export const KeyboardSwitcher = () => {
  const [keyboard, setKeyboard] = useState<Keyboard>(availableKeyboards[0]);

  useEffect(() => {
    window.electron.onSwitchKeyboard(setKeyboard);
  }, []);

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code !== 'Tab') return;
    if (!e.ctrlKey || e.altKey || e.metaKey) return;
    if (!e.shiftKey) {
      setKeyboard(availableKeyboards[(availableKeyboards.indexOf(keyboard) + 1) % availableKeyboards.length]);
    } else {
      setKeyboard(availableKeyboards[(availableKeyboards.indexOf(keyboard) + (availableKeyboards.length - 1)) % availableKeyboards.length]);
    }
  });

  switch (keyboard) {
    case 'Ergodox': return <Ergodox />;
    case 'Crkbd': return <Crkbd />;
  }
}
