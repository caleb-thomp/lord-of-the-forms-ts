import { Component, ComponentProps } from "react";

export class ClassInputProps extends Component<{
  label: string;
  inputProps: ComponentProps<"input">;
}> {
  render() {
    const { label, inputProps } = this.props;
    return (
      <>
        <label>{label}: </label>
        <input {...inputProps} />
      </>
    );
  }
}
