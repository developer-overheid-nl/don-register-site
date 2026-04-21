import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type HTMLProps,
  type PropsWithChildren,
  useId,
} from "react";
import Infobutton, { type InfoButtonProps } from "../infoButton/InfoButton";
import styles from "./styles.module.css";

interface ToolTipProps extends HTMLProps<HTMLButtonElement> {
  id?: string;
  className?: string;
  text: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  command?: InfoButtonProps["command"];
  commandfor?: InfoButtonProps["commandfor"];
  interestfor?: InfoButtonProps["interestfor"];
  popover?: HTMLAttributes<HTMLDivElement>["popover"];
}

const ToolTip = (props: PropsWithChildren<ToolTipProps>) => {
  const genId: string = useId();
  const {
    id = genId,
    className,
    text,
    command = "toggle-popover",
    commandfor = genId,
    interestfor = genId,
    popover = "manual",
    children,
    ...restProps
  } = props;

  return (
    <>
      {children ? (
        children
      ) : (
        <Infobutton
          interestfor={interestfor}
          commandfor={commandfor}
          command={command}
          {...restProps}
        />
      )}
      <div className={styles.toolTip} id={id} popover={popover} role="tooltip">
        {text}
      </div>
    </>
  );
};

export default ToolTip;
