import React, { createRef } from "react";
import { PhoneInputProps } from "../types";

export const FunctionalPhoneInput = ({
  phoneNumber,
  phoneNumberChange,
}: PhoneInputProps) => {
  const phoneNumberRefs = phoneNumber.map(() =>
    createRef<HTMLInputElement>()
  );

  const onInputChange = (index: number, value: string) => {
    if (value === "") {
      if (index > 0) {
        phoneNumberRefs[index - 1].current?.focus();
      }
    } else if (
      value.length === 2 &&
      index < phoneNumberRefs.length - 1
    ) {
      phoneNumberRefs[index + 1].current?.focus();
    }

    const newPhoneNumber = phoneNumberRefs.map(
      (ref) => ref.current?.value
    );
    phoneNumberChange(newPhoneNumber as string[]);
  };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        {phoneNumberRefs.map((ref, index) => (
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
                onInputChange(index, e.target.value)
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
};
