import {
  CSSProperties,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PiNumpadFill, PiMicrophoneSlashFill } from 'react-icons/pi';
import { TbNumbers } from 'react-icons/tb';
import { KeyBinding, KeyLoc } from './Key';
import { Combo, Keymap } from './Keymap';
import { useEventListener } from './useEventListener';

const phi = (25 / 180) * Math.PI;

const ergodoxMatrix: KeyLoc[] = [
  { finger: 'Pinky', x: -9.25, y: 0.875, w: 1.5 },
  { finger: 'Pinky', x: -8, y: 0.875 },
  { finger: 'Ring', x: -7, y: 0.625 },
  { finger: 'Middle', x: -6, y: 0.5 },
  { finger: 'Index', x: -5, y: 0.625 },
  { finger: 'Index', x: -4, y: 0.75 },
  { finger: 'Index', x: -3, y: 0.75 },
  { finger: 'Index', x: 3, y: 0.75 },
  { finger: 'Index', x: 4, y: 0.75 },
  { finger: 'Index', x: 5, y: 0.625 },
  { finger: 'Middle', x: 6, y: 0.5 },
  { finger: 'Ring', x: 7, y: 0.625 },
  { finger: 'Pinky', x: 8, y: 0.875 },
  { finger: 'Pinky', x: 9.25, y: 0.875, w: 1.5 },

  { finger: 'Pinky', x: -9.25, y: 1.875, w: 1.5 },
  { finger: 'Pinky', x: -8, y: 1.875 },
  { finger: 'Ring', x: -7, y: 1.625 },
  { finger: 'Middle', x: -6, y: 1.5 },
  { finger: 'Index', x: -5, y: 1.625 },
  { finger: 'Index', x: -4, y: 1.75 },
  { finger: 'Index', x: -3, y: 2, h: 1.5 },
  { finger: 'Index', x: 3, y: 2, h: 1.5 },
  { finger: 'Index', x: 4, y: 1.75 },
  { finger: 'Index', x: 5, y: 1.625 },
  { finger: 'Middle', x: 6, y: 1.5 },
  { finger: 'Ring', x: 7, y: 1.625 },
  { finger: 'Pinky', x: 8, y: 1.875 },
  { finger: 'Pinky', x: 9.25, y: 1.875, w: 1.5 },

  { finger: 'Pinky', x: -9.25, y: 2.875, w: 1.5 },
  { finger: 'Pinky', x: -8, y: 2.875 },
  { finger: 'Ring', x: -7, y: 2.625 },
  { finger: 'Middle', x: -6, y: 2.5 },
  { finger: 'Index', x: -5, y: 2.625 },
  { finger: 'Index', x: -4, y: 2.75 },
  { finger: 'Index', x: -3, y: 3.5, h: 1.5 },
  { finger: 'Index', x: 3, y: 3.5, h: 1.5 },
  { finger: 'Index', x: 4, y: 2.75 },
  { finger: 'Index', x: 5, y: 2.625 },
  { finger: 'Middle', x: 6, y: 2.5 },
  { finger: 'Ring', x: 7, y: 2.625 },
  { finger: 'Pinky', x: 8, y: 2.875 },
  { finger: 'Pinky', x: 9.25, y: 2.875, w: 1.5 },

  { finger: 'Pinky', x: -9.25, y: 3.875, w: 1.5 },
  { finger: 'Pinky', x: -8, y: 3.875 },
  { finger: 'Ring', x: -7, y: 3.625 },
  { finger: 'Middle', x: -6, y: 3.5 },
  { finger: 'Index', x: -5, y: 3.625 },
  { finger: 'Index', x: -4, y: 3.75 },
  { finger: 'Index', x: 4, y: 3.75 },
  { finger: 'Index', x: 5, y: 3.625 },
  { finger: 'Middle', x: 6, y: 3.5 },
  { finger: 'Ring', x: 7, y: 3.625 },
  { finger: 'Pinky', x: 8, y: 3.875 },
  { finger: 'Pinky', x: 9.25, y: 3.875, w: 1.5 },

  { finger: 'Pinky', x: -9, y: 4.875 },
  { finger: 'Ring', x: -8, y: 4.875 },
  { finger: 'Middle', x: -7, y: 4.625 },
  { finger: 'Index', x: -6, y: 4.5 },
  { finger: 'Thumb', x: -5, y: 4.625 },
  { finger: 'Thumb', x: 5, y: 4.625 },
  { finger: 'Index', x: 6, y: 4.5 },
  { finger: 'Middle', x: 7, y: 4.625 },
  { finger: 'Ring', x: 8, y: 4.875 },
  { finger: 'Pinky', x: 9, y: 4.875 },

  { finger: 'Thumb', x: -3.5, y: 5.5, phi, h: 2 },
  {
    finger: 'Thumb',
    x: -3.5 + Math.cos(phi),
    y: 5.5 + Math.sin(phi),
    phi,
    h: 2,
  },
  {
    finger: 'Thumb',
    x: -3.5 + 2 * Math.cos(phi) - 0.5 * Math.sin(phi),
    y: 5.5 + 2 * Math.sin(phi) + 0.5 * Math.cos(phi),
    phi,
  },
  {
    finger: 'Thumb',
    x: -3.5 + 2 * Math.cos(phi) + 0.5 * Math.sin(phi),
    y: 5.5 + 2 * Math.sin(phi) - 0.5 * Math.cos(phi),
    phi,
  },
  {
    finger: 'Thumb',
    x: -3.5 + 2 * Math.cos(phi) + 1.5 * Math.sin(phi),
    y: 5.5 + 2 * Math.sin(phi) - 1.5 * Math.cos(phi),
    phi,
  },
  {
    finger: 'Thumb',
    x: -3.5 + Math.cos(phi) + 1.5 * Math.sin(phi),
    y: 5.5 + Math.sin(phi) - 1.5 * Math.cos(phi),
    phi,
  },

  {
    finger: 'Thumb',
    x: 3.5 - Math.cos(phi) - 1.5 * Math.sin(phi),
    y: 5.5 + Math.sin(phi) - 1.5 * Math.cos(phi),
    phi: -phi,
  },
  {
    finger: 'Thumb',
    x: 3.5 - 2 * Math.cos(phi) - 1.5 * Math.sin(phi),
    y: 5.5 + 2 * Math.sin(phi) - 1.5 * Math.cos(phi),
    phi: -phi,
  },
  {
    finger: 'Thumb',
    x: 3.5 - 2 * Math.cos(phi) - 0.5 * Math.sin(phi),
    y: 5.5 + 2 * Math.sin(phi) - 0.5 * Math.cos(phi),
    phi: -phi,
  },
  {
    finger: 'Thumb',
    x: 3.5 - 2 * Math.cos(phi) + 0.5 * Math.sin(phi),
    y: 5.5 + 2 * Math.sin(phi) + 0.5 * Math.cos(phi),
    phi: -phi,
  },
  {
    finger: 'Thumb',
    x: 3.5 - Math.cos(phi),
    y: 5.5 + Math.sin(phi),
    phi: -phi,
    h: 2,
  },
  { finger: 'Thumb', x: 3.5, y: 5.5, phi: -phi, h: 2 },
];

const ergodoxBase: KeyBinding[] = [
  { layers: ['◌̂', '◌̌', '↻', '◌̇', '\u25cc\u02de', '◌̣'] },
  { layers: ['1', '°', '¹', 'ª', '₁', '¬'] },
  { layers: ['2', '§', '²', 'º', '₂', '∨'] },
  { layers: ['3', 'ℓ', '³', '№', '₃', '∧'] },
  { layers: ['4', '»', '›', '', '♀', '⊥'] },
  { layers: ['5', '«', '‹', '·', '♂', '∡'] },
  { tap: 'Ins' },
  { tap: 'Esc' },
  { layers: ['6', '$', '¢', '£', '⚥', '∥'] },
  { layers: ['7', '€', '¥', '¤', 'ϰ', '→'] },
  { layers: ['8', '„', '‚', '⇥', '⟨', '∞'] },
  { layers: ['9', '“', '‘', '/', '⟩', '∝'] },
  { layers: ['0', '”', '’', '*', '₀', '∅'] },
  {
    layers: ['-', '—', '', '-', '‑', '­'],
    doubleTap: { layers: ['◌́', '◌̧', '◌̸', '◌̋', '◌̓', '◌̆'] },
  },

  { tap: 'Cut' },
  { layers: ['x', 'X', '…', '⇞', 'ξ', 'Ξ'] },
  { layers: ['v', 'V', '_', '⌫', '', '√'] },
  { layers: ['l', 'L', '[', '⇡', 'λ', 'Λ'] },
  { layers: ['c', 'C', ']', '⌦', 'χ', 'ℂ'] },
  { layers: ['w', 'W', '^', '⇟', 'ω', 'Ω'] },
  { tap: '⌦' },
  { tap: '⌫' },
  { layers: ['k', 'K', '!', '¡', 'κ', '×'] },
  { layers: ['h', 'H', '<', '7', 'ψ', 'Ψ'] },
  { layers: ['g', 'G', '>', '8', 'γ', 'Γ'] },
  { layers: ['f', 'F', '=', '9', 'φ', 'Φ'] },
  { layers: ['q', 'Q', '&', '+', 'ϕ', 'ℚ'] },
  {
    layers: ['ß', 'ẞ', 'ſ', '−', 'ς', '∘'],
    doubleTap: { layers: ['◌̀', '◌̧', '◌̊', '◌̈', '◌̔', '◌̄'] },
  },

  { tap: 'Copy' },
  { layers: ['u', 'U', '\\', '⇱', '', '⊂'], hold: 'Gui' },
  { layers: ['i', 'I', '/', '⇠', 'ι', '∫'], hold: 'Alt' },
  { layers: ['a', 'A', '{', '⇣', 'α', '∀'], hold: 'Shift' },
  { layers: ['e', 'E', '}', '⇢', 'ε', '∃'], hold: 'Ctrl' },
  { layers: ['o', 'O', '*', '⇲', 'ο', '∈'] },
  { tap: '⇥' },
  { tap: '↵' },
  { layers: ['s', 'S', '?', '¿', 'σ', 'Σ'] },
  { layers: ['n', 'N', '(', '4', 'ν', 'ℕ'], hold: 'Ctrl' },
  { layers: ['r', 'R', ')', '5', 'ρ', 'ℝ'], hold: 'Shift' },
  { layers: ['t', 'T', '-', '6', 'τ', '∂'], hold: 'Alt' },
  { layers: ['d', 'D', ':', ',', 'δ', 'Δ'], hold: 'Gui' },
  { layers: ['y', 'Y', '@', '.', 'υ', '∇'] },

  { tap: 'Paste' },
  { layers: ['ü', 'Ü', '#', 'Esc', '', '∪'] },
  { layers: ['ö', 'Ö', '$', '⇥', 'ϵ', '∩'] },
  { layers: ['ä', 'Ä', '|', '⎀', 'η', 'ℵ'] },
  { layers: ['p', 'P', '~', '↵', 'π', 'Π'] },
  { layers: ['z', 'Z', '`', '↶', 'ζ', 'ℤ'] },
  { layers: ['b', 'B', '+', ':', 'β', '⇐'] },
  { layers: ['m', 'M', '%', '1', 'μ', '⇔'] },
  { layers: [',', '–', '"', '2', 'ϱ', '⇒'] },
  { layers: ['.', '•', "'", '3', 'ϑ', '↦'] },
  { layers: ['j', 'J', ';', ';', 'θ', 'Θ'] },
  { tap: { label: 'Numpad', icon: <PiNumpadFill /> } },

  {},
  {},
  {},
  {},
  { tap: 'Gui' },
  { tap: { label: 'Num+Fn', icon: <TbNumbers /> } },
  {},
  {},
  {},
  {},

  { tap: 'Shift' },
  { tap: 'Mod4' },
  { tap: 'Ctrl' },
  { tap: 'Alt' },
  {},
  {},
  {},
  {},
  {},
  { tap: 'Ctrl' },
  { tap: 'Mod3' },
  {
    layers: [
      { label: 'Space', char: ' ' },
      { label: 'Space', char: ' ' },
      { label: 'Space', char: ' ' },
      '0',
      { label: 'Nbsp', char: ' ', tooltip: 'Non-breaking space' },
      { label: 'Nnbsp', char: ' ', tooltip: 'Narrow non-breaking space' },
    ],
    hold: 'Arrows',
  },
];

const ergodoxArrows: KeyBinding[] = [
  { tap: 'F1' },
  { tap: 'F2' },
  { tap: 'F3' },
  { tap: 'F4' },
  { tap: 'F5' },
  { tap: 'F6' },
  { tap: 'Ins' },
  { tap: 'Esc' },
  { tap: 'F7' },
  { tap: 'F8' },
  { tap: 'F9' },
  { tap: 'F10' },
  { tap: 'F11' },
  { tap: 'F12' },

  { tap: 'Cut' },
  {},
  {},
  {},
  {},
  {},
  { tap: '⌦' },
  { tap: '⌫' },
  { tap: { label: 'Back', tooltip: 'Backwards in history (Alt+Left)' } },
  { tap: { label: 'NextTab', tooltip: 'Cycle through tabs (Ctrl+Tab)' } },
  {
    tap: { label: 'PrevTab', tooltip: 'Cycle through tabs (Ctrl+ Shift+ Tab)' },
  },
  { tap: { label: 'Forward', tooltip: 'Forwards in history (Alt+Right)' } },
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

  {},
  {},
  {},
  {},
  { tap: 'Gui' },
  { tap: { label: 'Num+Fn', icon: <TbNumbers /> } },
  {},
  {},
  {},
  {},

  { tap: 'Shift' },
  { tap: 'Mod4' },
  { tap: 'Ctrl' },
  { tap: 'Alt' },
  {},
  {},
  {},
  {},
  {},
  { tap: 'Ctrl' },
  { tap: 'Mod3' },
  { tap: 'Space', hold: 'Arrows', pressed: true },
];

const ergodoxNumfn = [
  {},
  {},
  {},
  {},
  {},
  {},
  { tap: 'Ins' },
  { tap: 'Esc' },
  {},
  {},
  {},
  {},
  {},
  {},

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
  {
    layers: ['-', '—', '', '-', '‑', '­'],
    doubleTap: { layers: ['◌́', '◌̧', '◌̸', '◌̋', '◌̓', '◌̆'] },
  },

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

  {},
  {},
  {},
  {},
  { tap: 'Gui' },
  { tap: { label: 'Num+Fn', icon: <TbNumbers /> }, pressed: true },
  {},
  {},
  {},
  {},

  { tap: 'Shift' },
  { tap: 'Mod4' },
  { tap: 'Ctrl' },
  { tap: 'Alt' },
  {},
  {},
  {},
  {},
  {},
  { tap: 'Ctrl' },
  { tap: 'Mod3' },
  { tap: 'Space', hold: 'Arrows' },
];

const ergodoxNumpad = [
  {},
  {},
  {},
  {},
  {},
  {},
  { tap: 'Ins' },
  { tap: 'Esc' },
  {},
  { layers: ['⇥', '⇤', '=', '≠', '≈', '≡'] },
  { layers: ['/', '/', '÷', '⁄', '⌀', '∣'] },
  { layers: ['*', '*', '⋅', '×', '⊙', '⊗'] },
  {},
  {},

  {},
  {},
  {},
  {},
  {},
  {},
  { tap: '⌦' },
  { tap: '⌫' },
  {},
  { layers: ['7', '✔', '↕', '⇱', '≪', '⌈'] },
  { layers: ['8', '✘', '↑', '⇡', '∩', '⋂'] },
  { layers: ['9', '†', '◌⃗', '⇞', '≫', '⌉'] },
  { layers: ['-', '-', '−', '∖', '⊖', '∸'] },
  {},

  {},
  { tap: 'Gui' },
  { tap: 'Alt' },
  { tap: 'Shift' },
  { tap: 'Ctrl' },
  {},
  { tap: '⇥' },
  { tap: '↵' },
  {},
  { layers: ['4', '♣', '←', '⇠', '⊂', '⊆'] },
  { layers: ['5', '€', ':', '', '⊶', '⊷'] },
  { layers: ['6', '‣', '→', '⇢', '⊃', '⊇'] },
  { layers: ['+', '+', '±', '∓', '⊕', '∔'] },
  { tap: 'Neo' },

  {},
  {},
  {},
  {},
  {},
  {},
  {},
  { layers: ['1', '♦', '↔', '⇲', '≤', '⌊'] },
  { layers: ['2', '♥', '↓', '⇣', '∪', '⋃'] },
  { layers: ['3', '♠', '⇌', '⇟', '≥', '⌋'] },
  { layers: ['↵', '↵', '↵', '↵', '↵', '↵'] },
  { tap: { label: 'Numpad', icon: <PiNumpadFill /> }, pressed: true },

  {},
  {},
  {},
  {},
  { tap: 'Gui' },
  { tap: { label: 'Num+Fn', icon: <TbNumbers /> } },
  {},
  {},
  {},
  {},

  { tap: 'Shift' },
  { tap: 'Mod4' },
  { tap: 'Ctrl' },
  { tap: 'Alt' },
  {},
  {},
  {},
  {},
  {},
  { tap: 'Ctrl' },
  { tap: 'Mod3' },
  { layers: ['0', '␣', '%', '⎀', '‰', '□'] },
];

const combos: Combo[] = [
  { keys: ['m', ','], action: 'Esc' },
  { keys: ['ä', 'p'], action: 'Ins' },
  {
    keys: ['b', 'm'],
    action: {
      label: 'Mute',
      icon: <PiMicrophoneSlashFill />,
      tooltip: 'Mute/unmute microphone (Gui+M)',
    },
  },
];

export function Ergodox() {
  const rootElement = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const [zoom, setZoom] = useState(0.5);

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') setActiveLayer((activeLayer + 1) % 4);
    if (e.key === 'ArrowUp') setActiveLayer((activeLayer + 3) % 4);
  });

  const zoomFactor = 0.5;
  const keymapStyle = (layer: number): CSSProperties => ({
    margin: `calc(-240px * (1 - ${activeLayer === layer ? 1 : zoomFactor})) 0`,
    transform: `scale(${activeLayer === layer ? 1 : zoomFactor})`,
    transition: 'all 0.33s ease-out',
    overflowY: 'visible',
  });

  const handleResize = useCallback(() => {
    if (rootElement.current) {
      const zoomX = window.innerWidth / rootElement.current.clientWidth;
      const zoomY = window.innerHeight / rootElement.current.clientHeight;
      setZoom(Math.min(zoomX, zoomY));
    }
  }, [rootElement]);

  useEffect(() => handleResize(), [handleResize]);
  useEventListener('resize', handleResize);

  const takeScreenshot: MouseEventHandler<HTMLDivElement> = (event) => {
    event.currentTarget.classList.remove('pulse');
    const { x, y, width, height } = event.currentTarget.getBoundingClientRect();
    const rect = {
      x: x * zoom,
      y: y * zoom,
      width: width * zoom,
      height: height * zoom,
    };
    window.electron.takeScreenshot(rect);
    event.currentTarget.classList.add('pulse');
  };
  const layers: [KeyBinding[], Combo[]?][] = [
    [ergodoxBase, combos],
    [ergodoxArrows],
    [ergodoxNumfn],
    [ergodoxNumpad],
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        zoom,
      }}
      ref={rootElement}
    >
      {layers.map(([bindings, combos], layer) => (
        <div style={keymapStyle(layer)} key={layer}>
          <Keymap
            matrix={ergodoxMatrix}
            keys={bindings}
            combos={combos}
            width="1440px"
            height="480px"
            onClick={takeScreenshot}
          />
        </div>
      ))}
    </div>
  );
}
