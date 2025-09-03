import clsx from 'clsx';
import styles from './styles.module.css'
import { type HTMLAttributes, type ReactNode } from 'react';

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  appearance?: 'clear' | 'outlined' | 'filled';
  layout?: 'full' | 'flex-row' | 'flex-col';
}

const Block = (props: BlockProps) => {
  const { className, appearance = 'filled', layout = 'full', ...restProps } = props;

  return (
    <div className={clsx([styles.block, className, styles[appearance], styles[layout]])} {...restProps}>
      {props.children}
    </div>
  );
};

export default Block;
