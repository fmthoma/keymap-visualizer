import { CSSProperties } from 'react';

export type Modifier = 'Shift' | 'Mod3' | 'Mod4';
export type Finger = 'Pinky' | 'Ring' | 'Middle' | 'Index' | 'Thumb';

export type KeyLoc = {
  x: number;
  y: number;
  finger: Finger;
  w?: number;
  h?: number;
  phi?: number;
};

export type KeyBinding = {
  tap?: string;
  hold?: string;
  layers?: string[];
  pressed?: boolean;
};

export type KeyProps = {
  loc: KeyLoc;
  binding: KeyBinding;
  mods: Modifier[];
};

const fingerColors: { [K in Finger]: string } = {
  Pinky: '#859900',
  Ring: '#2aa198',
  Middle: '#268bd2',
  Index: '#6c71c4',
  Thumb: '#d33682',
};

export function Key({ loc, binding, mods }: KeyProps) {
  const unit = 64;
  const keyStyle: CSSProperties = {
    position: 'absolute',
    left: `${unit * (loc.x - 0.5 * (loc.w ?? 1))}px`,
    top: `${unit * (loc.y - 0.5 * (loc.h ?? 1))}px`,
    width: `${unit * ((loc.w ?? 1) - 0.1)}px`,
    height: `${unit * ((loc.h ?? 1) - 0.1)}px`,
    border: '1px solid black',
    borderRadius: 0.1 * unit,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: `${fingerColors[loc.finger]}${binding.pressed ? '80' : 'ff'}`,
    rotate: `${loc.phi}rad`,
    fontFamily: 'monospace',
    color: '#002b36'
  };

  const layer =
    mods.length === 0
      ? 1
      : mods.every((v) => v === 'Shift')
        ? 2
        : mods.every((v) => v === 'Mod3')
          ? 3
          : mods.every((v) => v === 'Mod4')
            ? 4
            : mods.every((v) => v === 'Shift' || v === 'Mod3')
              ? 5
              : mods.every((v) => v === 'Mod3' || v === 'Mod4')
                ? 6
                : 1;
  const tapLabel = binding.layers?.[layer - 1] ?? binding.tap;
  const holdLabel = layer === 1 ? binding.hold : undefined;

  return (
    <div style={keyStyle}>
      <b style={{ fontSize: unit / 3 }}>{tapLabel}</b>
      <span style={{ fontSize: unit / 8 }}>{holdLabel}</span>
    </div>
  );
}
