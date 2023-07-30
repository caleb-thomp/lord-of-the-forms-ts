import { ComponentProps } from "react";

export const FunctionalInputProps = ({
  label,
  inputProps,
}: {
  label: string;
  inputProps: ComponentProps<"input">;
}) => {
  return (
    <>
      <div className="input-wrap">
        <label>{label}: </label>
        <input {...inputProps} />
      </div>
    </>
  );
};
