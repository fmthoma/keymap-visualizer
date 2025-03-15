import { useState } from 'react';
import { Key, KeyBinding, KeyLoc, Modifier } from './Key';
import { useEventListener } from './useEventListener';
import { Combo } from './Combo';

export type Combo = {
  keys: string[];
  action: string;
};

export type KeymapProps = {
  matrix: KeyLoc[];
  keys: KeyBinding[];
  combos?: Combo[];
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

export function Keymap({ matrix, keys: bindings, combos }: KeymapProps) {
  const [modifiers, setModifiers] = useState<Modifier[]>([]);

  useEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        setModifiers(
          modifiers.includes('Shift')
            ? modifiers.filter((m) => m !== 'Shift')
            : ['Shift', ...modifiers],
        );
        break;
      case 'CapsLock':
      case 'Backslash':
        setModifiers(
          modifiers.includes('Mod3')
            ? modifiers.filter((m) => m !== 'Mod3')
            : ['Mod3', ...modifiers],
        );
        break;
      case 'IntlBackslash':
      case 'AltRight':
        setModifiers(
          modifiers.includes('Mod4')
            ? modifiers.filter((m) => m !== 'Mod4')
            : ['Mod4', ...modifiers],
        );
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

  const comboMarkers = (combos ?? []).map((combo) => {
    const locs = combo.keys
      .map((k) =>
        bindings.findIndex(
          (binding) => binding.tap === k || binding.layers?.[0] === k,
        ),
      )
      .filter((i) => i > 0)
      .map((i) => matrix[i]);
    if (locs.length < 2) {
      return null;
    }
    const avgLoc = {
      x: locs.map((l) => l.x).reduce((i, j) => i + j) / locs.length,
      y: locs.map((l) => l.y).reduce((i, j) => i + j) / locs.length,
    };
    return <Combo key={combo.action} action={combo.action} loc={avgLoc} />;
  });

  return (
    <div style={{ position: 'relative' }}>
      {keys}
      {comboMarkers}
    </div>
  );
}
