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
  shifted?: string;
  layer3?: string;
  layer4?: string;
  layer5?: string;
  layer6?: string;
};

export type KeyProps = {
  loc: KeyLoc;
  binding: KeyBinding;
  mods: Modifier[];
  down: boolean;
};

export function Key(props: KeyProps) {
  const unit = 80;
  const keyStyle: CSSProperties = {
    position: 'absolute',
    left: `${unit * (props.loc.x - 0.5)}px`,
    top: `${unit * (props.loc.y - 0.5)}px`,
    width: `${unit * (props.loc.w ?? 1 - 0.1)}px`,
    height: `${unit * (props.loc.h ?? 1 - 0.1)}px`,
    border: '1px solid black',
    borderRadius: 0.1*unit,
  };
  return <div style={keyStyle}>{props.binding.tap}</div>;
}
