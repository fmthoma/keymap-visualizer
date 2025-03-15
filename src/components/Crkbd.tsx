import { KeyBinding, KeyLoc } from './Key';
import { Keymap } from './Keymap';

const corneMatrix: KeyLoc[] = [
  { x: -7, y: -0.75 },
  { x: -6, y: -0.75 },
  { x: -5, y: -1 },
  { x: -4, y: -1.125 },
  { x: -3, y: -1 },
  { x: -2, y: -0.875 },
  { x: -1, y: -0.375 },
  { x: 1, y: -0.375 },
  { x: 2, y: -0.875 },
  { x: 3, y: -1 },
  { x: 4, y: -1.125 },
  { x: 5, y: -1 },
  { x: 6, y: -0.75 },
  { x: 7, y: -0.75 },

  { x: -7, y: 0.25 },
  { x: -6, y: 0.25 },
  { x: -5, y: 0 },
  { x: -4, y: -0.125 },
  { x: -3, y: 0 },
  { x: -2, y: 0.125 },
  { x: -1, y: 0.625 },
  { x: 1, y: 0.625 },
  { x: 2, y: 0.125 },
  { x: 3, y: 0 },
  { x: 4, y: -0.125 },
  { x: 5, y: 0 },
  { x: 6, y: 0.25 },
  { x: 7, y: 0.25 },

  { x: -7, y: 1.25 },
  { x: -6, y: 1.25 },
  { x: -5, y: 1 },
  { x: -4, y: 0.875 },
  { x: -3, y: 1 },
  { x: -2, y: 1.125 },
  { x: 2, y: 1.125 },
  { x: 3, y: 1 },
  { x: 4, y: 0.875 },
  { x: 5, y: 1 },
  { x: 6, y: 1.25 },
  { x: 7, y: 1.25 },

  { x: -3.5, y: 2.125 },
  {
    x: -3 + Math.cos((33.06 / 180) * Math.PI) * Math.sqrt(0.5),
    y: 2.125 + 0.5 - Math.sin((33.06 / 180) * Math.PI) * Math.sqrt(0.5),
    phi: (11.94 / 180) * Math.PI,
  },
  {
    x:
      -3 +
      Math.cos((11.94 / 180) * Math.PI) +
      Math.cos((32.43 / 180) * Math.PI) * Math.sqrt(0.8125),
    y:
      2.125 +
      0.5 +
      Math.sin((11.94 / 180) * Math.PI) -
      Math.sin((32.43 / 180) * Math.PI) * Math.sqrt(0.8125),
    phi: ((2 * 11.94) / 180) * Math.PI,
    w: 1,
    h: 1.5,
  },
  {
    x:
      3 -
      Math.cos((11.94 / 180) * Math.PI) -
      Math.cos((32.43 / 180) * Math.PI) * Math.sqrt(0.8125),
    y:
      2.125 +
      0.5 +
      Math.sin((11.94 / 180) * Math.PI) -
      Math.sin((32.43 / 180) * Math.PI) * Math.sqrt(0.8125),
    phi: ((-2 * 11.94) / 180) * Math.PI,
    w: 1,
    h: 1.5,
  },
  {
    x: 3 - Math.cos((33.06 / 180) * Math.PI) * Math.sqrt(0.5),
    y: 2.125 + 0.5 - Math.sin((33.06 / 180) * Math.PI) * Math.sqrt(0.5),
    phi: (-11.94 / 180) * Math.PI,
  },
  { x: 3.5, y: 2.125 },
];

const corneBase: KeyBinding[] = [
  { tap: 'Cut' },
  { layers: ['x', 'X', '…', '', 'ξ', 'Ξ'] },
  { layers: ['v', 'V', '_', '', '', '√'] },
  { layers: ['l', 'L', '[', '', 'λ', 'Λ'] },
  { layers: ['c', 'C', ']', '', 'χ', 'ℂ'] },
  { layers: ['w', 'W', '^', '', 'ω', ''] },
  { tap: '⌦' },
  { tap: '⌫' },
  { layers: ['k', 'K', '!', '¡', 'κ', ''] },
  { layers: ['h', 'H', '<', '7', 'ψ', 'Ψ'] },
  { layers: ['g', 'G', '>', '8', 'γ', 'Γ'] },
  { layers: ['f', 'F', '=', '9', 'φ', 'Φ'] },
  { layers: ['q', 'Q', '&', '+', 'ϕ', 'ℚ'] },
  { layers: ['ß', 'ẞ', 'ſ', '−', 'ς', ''] },

  { tap: 'Copy' },
  { layers: ['u', 'U', '\\', '', '', '⊂'], hold: 'Gui' },
  { layers: ['i', 'I', '/', '', '', '∫'], hold: 'Alt' },
  { layers: ['a', 'A', '{', '', 'α', '∀'], hold: 'Shift' },
  { layers: ['e', 'E', '}', '', 'ε', '∃'], hold: 'Ctrl' },
  { layers: ['o', 'O', '*', '', 'ο', ''] },
  { tap: '⇥' },
  { tap: '↵' },
  { layers: ['s', 'S', '?', '¿', 'σ', ''] },
  { layers: ['n', 'N', '(', '4', 'ν', 'ℕ'], hold: 'Ctrl' },
  { layers: ['r', 'R', ')', '5', 'ρ', 'ℝ'], hold: 'Shift' },
  { layers: ['t', 'T', '-', '6', 'τ', '∂'], hold: 'Alt' },
  { layers: ['d', 'D', ':', ',', 'δ', 'Δ'], hold: 'Gui' },
  { layers: ['y', 'Y', '@', '.', 'υ', ''] },

  { tap: 'Paste' },
  { layers: ['ü', 'Ü', '#', '', '', '∪'] },
  { layers: ['ö', 'Ö', '$', '', '', '∩'] },
  { layers: ['ä', 'Ä', '|', '', 'η', 'ℵ'] },
  { layers: ['p', 'P', '~', '', 'π', 'Π'] },
  { layers: ['z', 'Z', '`', '', 'ζ', 'ℤ'] },
  { layers: ['b', 'B', '+', ':', 'β', '⇐'] },
  { layers: ['m', 'M', '%', '1', 'μ', '⇔'] },
  { layers: [',', '–', '"', '2', 'ϱ', '⇒'] },
  { layers: ['.', '•', "'", '3', 'ϑ', '↦'] },
  { layers: ['j', 'J', ';', ';', 'θ', 'Θ'] },
  {},

  {},
  {},
  {},
  {},
  {},
  {},
];

const corneArrows: KeyBinding[] = [
  { tap: 'Cut' },
  {},
  {},
  {},
  {},
  {},
  { tap: '⌦' },
  { tap: '⌫' },
  {},
  {},
  {},
  {},
  {},
  {},

  { tap: 'Copy' },
  { tap: 'Gui' },
  { tap: 'Alt' },
  { tap: 'Shift' },
  { tap: 'Ctrl' },
  {},
  { tap: '⇥' },
  { tap: '↵' },
  { tap: '←' },
  { tap: '↓' },
  { tap: '↑' },
  { tap: '→' },
  {},
  {},

  { tap: 'Paste' },
  {},
  {},
  {},
  {},
  {},
  { tap: '⇱' },
  { tap: '⇟' },
  { tap: '⇞' },
  { tap: '⇲' },
  {},
  {},

  {},
  {},
  {},
  {},
  {},
  {},
];

export function Crkbd() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '320px' }}>
        <Keymap matrix={corneMatrix} keys={corneBase} />
      </div>
      <div style={{ height: '320px' }}>
        <Keymap matrix={corneMatrix} keys={corneArrows} />
      </div>
    </div>
  );
}
