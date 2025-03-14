import { Key, KeyBinding, KeyLoc } from './Key';

export type KeymapProps = {
  matrix: KeyLoc[];
  keys: KeyBinding[];
};

const zipWith =
  <A, B, C>(as: A[], bs: B[]) =>
  (f: (a: A, b: B) => C) => {
    const res = [];
    for (let i = 0; i < Math.min(as.length, bs.length); i++) {
      res.push(f(as[i], bs[i]));
    }
    return res;
  };

export const Keymap = (props: KeymapProps) => {
  return zipWith(
    props.matrix,
    props.keys,
  )((loc, binding) => (
    <Key loc={loc} binding={binding} mods={[]} down={false} />
  ));
};
