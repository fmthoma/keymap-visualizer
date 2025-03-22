import { ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';

export type KeyLabel =
  | string
  | { label: string; char?: string; icon?: ReactNode; tooltip?: string };

export function KeyLabel({ label }: { label?: KeyLabel }) {
  if (!label) return null;
  if (typeof label === 'string') return label;
  const id = `tooltip-${label.label}-anchor`;
  return (
    <>
      <a style={{ all: 'unset' }} id={id}>
        {label.icon ? label.icon : label.label}
      </a>
      <Tooltip anchorSelect={`#${id}`}>{label.tooltip}</Tooltip>
    </>
  );
}
