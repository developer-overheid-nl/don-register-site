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
  /**
   * Screen reader names for the on and off options in `explicit` mode.
   * The default switch announces its own on/off state via `role="switch"`.
   */
  labels?: SwitchLabels;
  /**
   * Render two radio options (on/off) instead of a single checkbox, so "off" is submitted as a value.
   * With neither option checked the switch shows an indeterminate state (thumb in the middle).
   */
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
        // In explicit mode `id` is on the group, so a FormField `<label for={id}>` doesn't name only the first radio
        id={explicit ? id : undefined}
        role={explicit ? "group" : undefined}
        aria-labelledby={explicit ? props["aria-labelledby"] : undefined}
      >
        {explicit ? (
          <>
            <input
              id={`${id}-on`}
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
            checked={checked}
            defaultChecked={defaultChecked || undefined}
            disabled={disabled || undefined}
            required={required}
            ref={ref}
            role={role ?? "switch"}
            tabIndex={tabIndex}
            {...restProps}
          />
        )}
        <label
          htmlFor={explicit ? `${id}-on` : id}
          className={clsx(
            "utrecht-form-toggle__track",
            "utrecht-form-toggle__track--html-label",
          )}
        >
          <div className="utrecht-form-toggle__thumb">
            {explicit ? <span className="sr-only">{labels.on}</span> : null}
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
              <span className="sr-only">{labels.off}</span>
            </div>
          </label>
        )}
      </div>
    );
  },
);

export default Switch;
