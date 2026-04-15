import clsx from "clsx";
import {
  type ForwardedRef,
  forwardRef,
  type InputHTMLAttributes,
  useId,
} from "react";
import styles from "./styles.module.css";

export interface SwitchLabels {
  on: string;
  off: string;
}

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly"> {
  invalid?: boolean;
  labels?: SwitchLabels;
}

const Switch = forwardRef(
  (props: SwitchProps, ref: ForwardedRef<HTMLInputElement>) => {
    const genId = useId();
    const {
      id = genId,
      disabled,
      invalid,
      required,
      hidden,
      checked,
      defaultChecked,
      role,
      tabIndex,
      className,
      labels = { on: "ON", off: "OFF" },
      ...restProps
    } = props;

    return (
      <div
        className={clsx(
          "utrecht-form-toggle",
          "utrecht-form-toggle--html-checkbox",
          {
            "utrecht-form-toggle--disabled": disabled,
            "utrecht-form-toggle--invalid": invalid,
            "utrecht-form-toggle--required": required,
          },
          styles.switch,
          className,
        )}
        hidden={hidden}
      >
        <input
          id={id}
          aria-invalid={invalid || undefined}
          type="checkbox"
          className="utrecht-form-toggle__checkbox"
          checked={checked}
          defaultChecked={defaultChecked || undefined}
          disabled={disabled || undefined}
          required={required}
          ref={ref}
          role={role}
          tabIndex={tabIndex}
          {...restProps}
        />
        <label
          htmlFor={id}
          className={clsx(
            "utrecht-form-toggle__track",
            "utrecht-form-toggle__track--html-label",
          )}
        >
          <div className="utrecht-form-toggle__thumb">
            <span className="sr-only">
              {checked || defaultChecked ? labels.on : labels.off}
            </span>
          </div>
        </label>
      </div>
    );
  },
);

export default Switch;
