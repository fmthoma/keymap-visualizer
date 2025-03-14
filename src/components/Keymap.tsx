import { Key, KeyBinding, KeyLoc } from './Key';

export type KeymapProps = {
  matrix: KeyLoc[];
  keys: KeyBinding[];
};

const zipWith =
  <A, B>(as: A[], bs: B[]) =>
  <C,>(f: (a: A, b: B) => C): C[] => {
    const res = [];
    for (let i = 0; i < Math.min(as.length, bs.length); i++) {
      res.push(f(as[i], bs[i]));
    }
    return res;
  };

export function Keymap(props: KeymapProps) {
  const keys = zipWith(
    props.matrix,
    props.keys,
  )((loc, binding) => (
    <Key loc={loc} binding={binding} mods={[]} down={false} />
  ));

  return <div style={{ position: 'relative' }}>{keys}</div>;
}
