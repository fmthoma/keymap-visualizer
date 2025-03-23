import { useEffect, useState } from 'react';
import { useEventListener } from './useEventListener';
import { Ergodox } from './Ergodox';
import { Crkbd } from './Crkbd';

type Keyboard = 'Crkbd' | 'Ergodox';

const availableKeyboards: Keyboard[] = ['Crkbd', 'Ergodox'];

export function KeyboardSwitcher() {
  const [keyboard, setKeyboard] = useState<Keyboard>(availableKeyboards[0]);

  useEffect(() => {
    window.electron.onSwitchKeyboard(setKeyboard);
  }, []);

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code !== 'Tab') return;
    if (!e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.shiftKey) {
      const previousKeyboard =
        availableKeyboards[
          (availableKeyboards.indexOf(keyboard) +
            (availableKeyboards.length - 1)) %
            availableKeyboards.length
        ];
      setKeyboard(previousKeyboard);
      window.electron.switchKeyboard(previousKeyboard);
    } else {
      const nextKeyboard =
        availableKeyboards[
          (availableKeyboards.indexOf(keyboard) + 1) % availableKeyboards.length
        ];
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
