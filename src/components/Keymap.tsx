import { act, useState } from 'react';
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

const toggleShift = (layer: number) => {
  switch (layer) {
    case 1:
      return 2;
    case 2:
      return 1;
    case 3:
      return 5;
    case 4:
      return 2;
    case 5:
      return 3;
    case 6:
      return 5;
    default:
      return 2;
  }
};

const toggleMod3 = (layer: number) => {
  switch (layer) {
    case 1:
      return 3;
    case 2:
      return 5;
    case 3:
      return 1;
    case 4:
      return 3;
    case 5:
      return 2;
    case 6:
      return 5;
    default:
      return 3;
  }
};

const toggleMod4 = (layer: number) => {
  switch (layer) {
    case 1:
      return 4;
    case 2:
      return 4;
    case 3:
      return 6;
    case 4:
      return 1;
    case 5:
      return 6;
    case 6:
      return 3;
    default:
      return 4;
  }
};

export function Keymap({ matrix, keys: bindings, combos }: KeymapProps) {
  const [activeLayer, setActiveLayer] = useState<number>(1);

  useEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        setActiveLayer(toggleShift(activeLayer));
        break;
      case 'CapsLock':
      case 'Backslash':
        setActiveLayer(toggleMod3(activeLayer));
        break;
      case 'IntlBackslash':
      case 'AltRight':
        setActiveLayer(toggleMod4(activeLayer));
        break;
      case 'ArrowLeft':
        setActiveLayer(((activeLayer + 4) % 6) + 1);
        break;
      case 'ArrowRight':
        setActiveLayer((activeLayer % 6) + 1);
      default:
        break;
    }
  });

  const keys = zipWith(
    matrix,
    bindings,
  )((loc, binding, index) => (
    <Key loc={loc} binding={binding} layer={activeLayer} key={index} />
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
