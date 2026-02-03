import clsx from "clsx";
import type React from "react";

interface FormFieldLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

const FormFieldLabel: React.FC<FormFieldLabelProps> = ({
  htmlFor,
  children,
  className,
}) => {
  return (
    <label htmlFor={htmlFor} className={clsx("utrecht-form-label", className)}>
      {children}
    </label>
  );
};

export default FormFieldLabel;