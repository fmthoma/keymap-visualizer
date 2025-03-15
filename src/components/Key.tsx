import { CSSProperties } from 'react';

export type Modifier = 'Shift' | 'Mod3' | 'Mod4';

export type KeyLoc = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  phi?: number;
};

export type KeyBinding = {
  tap?: string;
  hold?: string;
  layers?: string[];
};

export type KeyProps = {
  loc: KeyLoc;
  binding: KeyBinding;
  mods: Modifier[];
  down: boolean;
};

export function Key({ loc, binding, mods, down }: KeyProps) {
  const unit = 80;
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
    background: `rgb(255, 255, 255, ${down ? 128 : 0})`,
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
