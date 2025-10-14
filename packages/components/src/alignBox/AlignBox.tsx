import React, { type ReactNode, type CSSProperties } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

type Align =
  | 'left'
  | 'center'
  | 'right'
  | 'top'
  | 'bottom'
  | 'middle'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'stretch'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type Gap = 'none' | 'small' | 'medium' | 'large';

export interface AlignBoxProps {
  align?: Align;
  gap?: Gap;
  direction? : 'row' | 'column';
  display?: 'block' | 'inline';
  className?: string;
  children: ReactNode;
}

const getAlignmentClass = (align: Align): string => {
  switch (align) {
    case 'left':
      return styles.left;
    case 'center':
      return styles.center;
    case 'right':
      return styles.right;
    case 'top':
      return styles.top;
    case 'bottom':
      return styles.bottom;
    case 'middle':
      return styles.middle;
    case 'top-left':
      return styles.topLeft;
    case 'top-right':
      return styles.topRight;
    case 'bottom-left':
      return styles.bottomLeft;
    case 'bottom-right':
      return styles.bottomRight;
    case 'stretch':
      return styles.stretch;
    case 'space-between':
      return styles.spaceBetween;
    case 'space-around':
      return styles.spaceAround;
    case 'space-evenly':
      return styles.spaceEvenly;
    default:
      return styles.center;
  }
};

const getGapClass = (gap: Gap): string => {
  switch (gap) {
    case 'none':
      return styles.gapNone;
    case 'small':
      return styles.gapSmall;
    case 'medium':
      return styles.gapMedium;
    case 'large':
      return styles.gapLarge;
    default:
      return styles.gapMedium;
  }
};

const AlignBox: React.FC<AlignBoxProps> = ({
  align = 'center',
  gap = 'none',
  direction = 'row',
  display = 'block',
  className,
  children,
}) => {
  const alignmentClass = getAlignmentClass(align);
  const gapClass = getGapClass(gap);

  return (
    <div className={clsx(styles.alignBox, styles[direction], styles[display], alignmentClass, gapClass, className ?? '')}>
      {children}
    </div>
  );
};

export default AlignBox;
