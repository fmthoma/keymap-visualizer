import { unit } from './Key';

export type ComboProps = {
  loc: { x: number; y: number };
  action: string;
};

export function Combo({ loc, action }: ComboProps) {
  return (
    <div
      key={action}
      style={{
        position: 'absolute',
        left: loc.x * unit,
        top: loc.y * unit,
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#eee8d5',
        color: '#586e75',
        border: '1px solid #002b36',
        borderRadius: '4px',
        padding: '2px',
        boxSizing: 'border-box',
      }}
    >
      {action}
    </div>
  );
}
