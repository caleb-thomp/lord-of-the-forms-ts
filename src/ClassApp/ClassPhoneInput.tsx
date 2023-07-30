import React, { createRef, Component } from "react";
import { PhoneInputProps } from "../types";

export class ClassPhoneInput extends Component<PhoneInputProps> {
  phoneNumberRefs = this.props.phoneNumber.map(() =>
    createRef<HTMLInputElement>()
  );

  onInputChange = (index: number, value: string) => {
    if (value === "") {
      if (index > 0) {
        this.phoneNumberRefs[index - 1].current?.focus();
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
                pattern="[0-9]*"
                inputMode="numeric"
                ref={ref}
                onChange={(e) =>
                  this.onInputChange(index, e.target.value)
                }
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
