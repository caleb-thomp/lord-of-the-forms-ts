import React, {
  createRef,
  Component,
  ChangeEventHandler,
} from "react";
import { PhoneInputProps } from "../types";

export class ClassPhoneInput extends Component<PhoneInputProps> {
  state = {
    phoneInputValue: [...this.props.phoneNumber],
  };

  phoneNumberRefs = this.props.phoneNumber.map(() =>
    createRef<HTMLInputElement>()
  );

  onInputChange =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const value = e.target.value;

      if (Number.isFinite(+value)) {
        const { phoneInputValue } = this.state;

        phoneInputValue[index] = value;
        this.setState({ phoneInputValue: phoneInputValue });
        if (value === "") {
          if (index > 0) {
            this.phoneNumberRefs[
              index - 1
            ].current?.focus();
          }
        } else if (
          value.length === 2 &&
          index < this.phoneNumberRefs.length - 1
        ) {
          this.phoneNumberRefs[index + 1].current?.focus();
        }
        const newPhoneNumber = this.phoneNumberRefs.map(
          (ref) => ref.current?.value
        );
        this.props.phoneNumberChange(
          newPhoneNumber as string[]
        );
      }
    };

  render() {
    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          {this.phoneNumberRefs.map((ref, index) => (
            <React.Fragment key={index}>
              <input
                type="text"
                id={`phone-input-${index + 1}`}
                placeholder={index < 3 ? "55" : "5"}
                maxLength={index < 3 ? 2 : 1}
                value={this.state.phoneInputValue[index]}
                ref={ref}
                onChange={this.onInputChange(index)}
              />
              {index < 3 && (
                <span className="phone-input-dash">-</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}
