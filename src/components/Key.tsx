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
  doubleTap?: KeyBinding;
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
  const doubleTapLabel =
    binding.doubleTap?.layers?.[layer - 1] ?? binding.doubleTap?.tap;

  const pressed =
    binding.pressed ||
    (loc.finger === 'Thumb' &&
      tapLabel &&
      mods.includes(tapLabel as Modifier)) ||
    (loc.finger === 'Thumb' &&
      binding.hold &&
      mods.includes(binding.hold as Modifier));
  const holdLabel = layer === 1 || pressed ? binding.hold : undefined;

  const unit = 64;
  const keyStyle: CSSProperties = {
    position: 'absolute',
    left: `${unit * (loc.x - 0.5 * (loc.w ?? 1))}px`,
    top: `${unit * (loc.y - 0.5 * (loc.h ?? 1))}px`,
    width: `${unit * ((loc.w ?? 1) - 0.1)}px`,
    height: `${unit * ((loc.h ?? 1) - 0.1)}px`,
    border: pressed ? '2px solid #b58900' : '1px solid #002b36',
    borderRadius: 0.1 * unit,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: `${fingerColors[loc.finger]}${pressed ? '40' : 'ff'}`,
    rotate: `${loc.phi}rad`,
    color: '#002b36',
  };
  const keyLabelStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const copyToClipboard = (text?: string) => () => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ ...keyStyle, ...(tapLabel ? {} : { opacity: 0.25 }) }}>
      <button onClick={copyToClipboard(tapLabel)} style={{all: "unset"}}>
      <div style={keyLabelStyle}>
        <b style={{ fontSize: unit / 3 }}>{tapLabel}</b>
        {holdLabel && <span style={{ fontSize: unit / 8 }}>{holdLabel}</span>}
      </div>
      </button>
      {binding.doubleTap && (
      <button onClick={copyToClipboard(tapLabel)} style={{all: "unset"}}>
        <div style={keyLabelStyle} onClick={copyToClipboard(doubleTapLabel)}>
          <b style={{ fontSize: unit / 3 }}>
            {binding.doubleTap.layers?.[layer - 1] ?? binding.doubleTap.tap}
          </b>
          {binding.doubleTap.hold && (
            <span style={{ fontSize: unit / 8 }}>{binding.doubleTap.hold}</span>
          )}
        </div>
      </button>
      )}
    </div>
  );
}
