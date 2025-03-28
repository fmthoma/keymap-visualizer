import { useEffect, useState } from 'react';
import { useEventListener } from './useEventListener';
import { Ergodox } from './Ergodox';
import { Crkbd } from './Crkbd';
import { Keyboard, keyboards } from '../types';

export function KeyboardSwitcher() {
  const [keyboard, setKeyboard] = useState<Keyboard>(keyboards[0]);

  useEffect(() => {
    window.electron.onSwitchKeyboard(setKeyboard);
  }, []);

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code !== 'Tab') return;
    if (!e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.shiftKey) {
      const previousKeyboard =
        keyboards[
          (keyboards.indexOf(keyboard) + (keyboards.length - 1)) %
            keyboards.length
        ];
      setKeyboard(previousKeyboard);
      window.electron.switchKeyboard(previousKeyboard);
    } else {
      const nextKeyboard =
        keyboards[(keyboards.indexOf(keyboard) + 1) % keyboards.length];
      setKeyboard(nextKeyboard);
      window.electron.switchKeyboard(nextKeyboard);
    }
  });

  switch (keyboard) {
    case 'Ergodox':
      return <Ergodox />;
    case 'Crkbd':
      return <Crkbd />;
  }
}
