export type Modifier = 'Shift' | 'Mod3' | 'Mod4';

export type KeyLoc = {
  x: number;
  y: number;
  phi: number;
};

export type KeyBinding = {
  tap: string;
  hold: string;
  shifted: string;
  layer3: string;
  layer4: string;
  layer5: string;
  layer6: string;
};

export type KeyProps = {
  loc: KeyLoc;
  binding: KeyBinding;
  mods: Modifier[];
  down: boolean;
};

export function Key(props: KeyProps) {
  return <div>{props.binding.tap}</div>;
}
