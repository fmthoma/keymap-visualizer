import { KeyBinding, KeyLoc } from './Key';
import { Keymap } from './Keymap';

const corneMatrix: KeyLoc[] = [
  { finger: 'Pinky', x: -7, y: -0.75 },
  { finger: 'Pinky', x: -6, y: -0.75 },
  { finger: 'Ring', x: -5, y: -1 },
  { finger: 'Middle', x: -4, y: -1.125 },
  { finger: 'Index', x: -3, y: -1 },
  { finger: 'Index', x: -2, y: -0.875 },
  { finger: 'Index', x: -1, y: -0.375 },
  { finger: 'Index', x: 1, y: -0.375 },
  { finger: 'Index', x: 2, y: -0.875 },
  { finger: 'Index', x: 3, y: -1 },
  { finger: 'Middle', x: 4, y: -1.125 },
  { finger: 'Ring', x: 5, y: -1 },
  { finger: 'Pinky', x: 6, y: -0.75 },
  { finger: 'Pinky', x: 7, y: -0.75 },

  { finger: 'Pinky', x: -7, y: 0.25 },
  { finger: 'Pinky', x: -6, y: 0.25 },
  { finger: 'Ring', x: -5, y: 0 },
  { finger: 'Middle', x: -4, y: -0.125 },
  { finger: 'Index', x: -3, y: 0 },
  { finger: 'Index', x: -2, y: 0.125 },
  { finger: 'Index', x: -1, y: 0.625 },
  { finger: 'Index', x: 1, y: 0.625 },
  { finger: 'Index', x: 2, y: 0.125 },
  { finger: 'Index', x: 3, y: 0 },
  { finger: 'Middle', x: 4, y: -0.125 },
  { finger: 'Ring', x: 5, y: 0 },
  { finger: 'Pinky', x: 6, y: 0.25 },
  { finger: 'Pinky', x: 7, y: 0.25 },

  { finger: 'Pinky', x: -7, y: 1.25 },
  { finger: 'Pinky', x: -6, y: 1.25 },
  { finger: 'Ring', x: -5, y: 1 },
  { finger: 'Middle', x: -4, y: 0.875 },
  { finger: 'Index', x: -3, y: 1 },
  { finger: 'Index', x: -2, y: 1.125 },
  { finger: 'Index', x: 2, y: 1.125 },
  { finger: 'Index', x: 3, y: 1 },
  { finger: 'Middle', x: 4, y: 0.875 },
  { finger: 'Ring', x: 5, y: 1 },
  { finger: 'Pinky', x: 6, y: 1.25 },
  { finger: 'Pinky', x: 7, y: 1.25 },

  { finger: 'Thumb', x: -3.5, y: 2.125 },
  {
    finger: 'Thumb',
    x: -3 + Math.cos((33.06 / 180) * Math.PI) * Math.sqrt(0.5),
    y: 2.125 + 0.5 - Math.sin((33.06 / 180) * Math.PI) * Math.sqrt(0.5),
    phi: (11.94 / 180) * Math.PI,
  },
  {
    finger: 'Thumb',
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
    finger: 'Thumb',
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
    finger: 'Thumb',
    x: 3 - Math.cos((33.06 / 180) * Math.PI) * Math.sqrt(0.5),
    y: 2.125 + 0.5 - Math.sin((33.06 / 180) * Math.PI) * Math.sqrt(0.5),
    phi: (-11.94 / 180) * Math.PI,
  },
  { finger: 'Thumb', x: 3.5, y: 2.125 },
];

const corneBase: KeyBinding[] = [
  { tap: 'Cut' },
  { layers: ['x', 'X', '…', '⇞', 'ξ', 'Ξ'] },
  { layers: ['v', 'V', '_', '⌫', '', '√'] },
  { layers: ['l', 'L', '[', '⇡', 'λ', 'Λ'] },
  { layers: ['c', 'C', ']', '⌦', 'χ', 'ℂ'] },
  { layers: ['w', 'W', '^', '⇟', 'ω', ''] },
  { tap: '⌦' },
  { tap: '⌫' },
  { layers: ['k', 'K', '!', '¡', 'κ', ''] },
  { layers: ['h', 'H', '<', '7', 'ψ', 'Ψ'] },
  { layers: ['g', 'G', '>', '8', 'γ', 'Γ'] },
  { layers: ['f', 'F', '=', '9', 'φ', 'Φ'] },
  { layers: ['q', 'Q', '&', '+', 'ϕ', 'ℚ'] },
  { layers: ['ß', 'ẞ', 'ſ', '−', 'ς', ''] },

  { tap: 'Copy' },
  { layers: ['u', 'U', '\\', '⇱', '', '⊂'], hold: 'Gui' },
  { layers: ['i', 'I', '/', '⇠', '', '∫'], hold: 'Alt' },
  { layers: ['a', 'A', '{', '⇣', 'α', '∀'], hold: 'Shift' },
  { layers: ['e', 'E', '}', '⇢', 'ε', '∃'], hold: 'Ctrl' },
  { layers: ['o', 'O', '*', '⇲', 'ο', ''] },
  { tap: '⇥' },
  { tap: '↵' },
  { layers: ['s', 'S', '?', '¿', 'σ', ''] },
  { layers: ['n', 'N', '(', '4', 'ν', 'ℕ'], hold: 'Ctrl' },
  { layers: ['r', 'R', ')', '5', 'ρ', 'ℝ'], hold: 'Shift' },
  { layers: ['t', 'T', '-', '6', 'τ', '∂'], hold: 'Alt' },
  { layers: ['d', 'D', ':', ',', 'δ', 'Δ'], hold: 'Gui' },
  { layers: ['y', 'Y', '@', '.', 'υ', ''] },

  { tap: 'Paste' },
  { layers: ['ü', 'Ü', '#', 'Esc', '', '∪'] },
  { layers: ['ö', 'Ö', '$', '⇥', '', '∩'] },
  { layers: ['ä', 'Ä', '|', '⎀', 'η', 'ℵ'] },
  { layers: ['p', 'P', '~', '↵', 'π', 'Π'] },
  { layers: ['z', 'Z', '`', '↶', 'ζ', 'ℤ'] },
  { layers: ['b', 'B', '+', ':', 'β', '⇐'] },
  { layers: ['m', 'M', '%', '1', 'μ', '⇔'] },
  { layers: [',', '–', '"', '2', 'ϱ', '⇒'] },
  { layers: ['.', '•', "'", '3', 'ϑ', '↦'] },
  { layers: ['j', 'J', ';', ';', 'θ', 'Θ'] },
  {},

  { tap: 'Gui' },
  { tap: 'Shift' },
  { tap: 'Ins', hold: 'Mod4' },
  { tap: 'Esc', hold: 'Mod3' },
  { tap: 'Space', hold: 'Arrows' },
  { tap: 'Num+Fn' },
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
  { tap: '⇠' },
  { tap: '⇣' },
  { tap: '⇡' },
  { tap: '⇢' },
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

  { tap: 'Gui' },
  { tap: 'Shift' },
  { tap: 'Ins', hold: 'Mod4' },
  { tap: 'Esc', hold: 'Mod3' },
  { tap: 'Space', hold: 'Arrows', pressed: true },
  { tap: 'Num+Fn' },
];

const corneNumfn = [
  { layers: ['◌̂', '◌̌', '↻', '◌̇', '\u25cc\u02de', '◌̣'] },
  { layers: ['1', '°', '¹', 'ª', '₁', '¬'] },
  { layers: ['2', '§', '²', 'º', '₂', '∨'] },
  { layers: ['3', 'ℓ', '³', '№', '₃', '∧'] },
  { layers: ['4', '»', '›', '', '♀', '⊥'] },
  { layers: ['5', '«', '‹', '·', '♂', '∡'] },
  { tap: '⌦' },
  { tap: '⌫' },
  { layers: ['6', '$', '¢', '£', '⚥', '∥'] },
  { layers: ['7', '€', '¥', '¤', 'ϰ', '→'] },
  { layers: ['8', '„', '‚', '⇥', '⟨', '∞'] },
  { layers: ['9', '“', '‘', '/', '⟩', '∝'] },
  { layers: ['0', '”', '’', '*', '₀', '∅'] },
  { layers: ['-', '—', '', '-', '‑', '­'] },

  {},
  { tap: 'Gui' },
  { tap: 'Alt' },
  { tap: 'Shift' },
  { tap: 'Ctrl' },
  {},
  { tap: '⇥' },
  { tap: '↵' },
  {},
  { tap: 'Ctrl' },
  { tap: 'Shift' },
  { tap: 'Alt' },
  { tap: 'Gui' },
  {},

  { tap: 'F1' },
  { tap: 'F2' },
  { tap: 'F3' },
  { tap: 'F4' },
  { tap: 'F5' },
  { tap: 'F6' },
  { tap: 'F7' },
  { tap: 'F8' },
  { tap: 'F9' },
  { tap: 'F10' },
  { tap: 'F11' },
  { tap: 'F12' },

  { tap: 'Gui' },
  { tap: 'Shift' },
  { tap: 'Ins', hold: 'Mod4' },
  { tap: 'Esc', hold: 'Mod3' },
  { tap: 'Space', hold: 'Arrows' },
  { tap: 'Num+Fn' },
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
      <div style={{ height: '320px' }}>
        <Keymap matrix={corneMatrix} keys={corneNumfn} />
      </div>
    </div>
  );
}
