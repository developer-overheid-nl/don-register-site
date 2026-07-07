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
  explicit?: boolean;
}

const Switch = forwardRef(
  (props: SwitchProps, ref: ForwardedRef<HTMLInputElement>) => {
    const genId = useId();
    const {
      id = genId,
      name,
      value,
      disabled,
      invalid,
      explicit,
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
      // biome-ignore lint/a11y/useAriaPropsSupportedByRole: okay because of role=group
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
          explicit && styles.explicit,
          className,
        )}
        hidden={hidden}
        role={explicit ? "group" : undefined}
        aria-labelledby={explicit ? props["aria-labelledby"] : undefined}
      >
        {explicit ? (
          <>
            <input
              id={id}
              aria-invalid={invalid || undefined}
              type="radio"
              name={name}
              value={Array.isArray(value) ? value[0] : value}
              className="utrecht-form-toggle__checkbox"
              defaultChecked={defaultChecked || undefined}
              disabled={disabled || undefined}
              required={required}
              ref={ref}
              role={role}
              tabIndex={tabIndex}
              {...restProps}
              aria-labelledby={undefined}
            />
            <input
              id={`negate_${id}`}
              aria-invalid={invalid || undefined}
              type="radio"
              name={name}
              value={Array.isArray(value) ? value[1] : `Not ${value}`}
              className="utrecht-form-toggle__checkbox"
              defaultChecked={
                (typeof defaultChecked !== "undefined" && !defaultChecked) ||
                undefined
              }
              disabled={disabled || undefined}
              required={required}
              ref={ref}
              role={role}
              tabIndex={tabIndex}
              {...restProps}
              aria-labelledby={undefined}
            />
          </>
        ) : (
          <input
            id={id}
            aria-invalid={invalid || undefined}
            type="checkbox"
            className="utrecht-form-toggle__checkbox"
            name={name}
            value={value}
            defaultChecked={defaultChecked || undefined}
            disabled={disabled || undefined}
            required={required}
            ref={ref}
            role={role}
            tabIndex={tabIndex}
            {...restProps}
          />
        )}
        <label
          htmlFor={id}
          className={clsx(
            "utrecht-form-toggle__track",
            "utrecht-form-toggle__track--html-label",
          )}
        >
          <div className="utrecht-form-toggle__thumb">
            <span className="sr-only">
              {explicit
                ? labels.off
                : checked || defaultChecked
                  ? labels.on
                  : labels.off}
            </span>
          </div>
        </label>
        {explicit && (
          <label
            htmlFor={`negate_${id}`}
            className={clsx(
              "utrecht-form-toggle__track",
              "utrecht-form-toggle__track--html-label",
            )}
          >
            <div className="utrecht-form-toggle__thumb">
              <span className="sr-only">{labels.on}</span>
            </div>
          </label>
        )}
      </div>
    );
  },
);

export default Switch;
