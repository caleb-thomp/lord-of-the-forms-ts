import React, {
  ChangeEventHandler,
  createRef,
  useState,
} from "react";
import { PhoneInputProps } from "../types";

export const FunctionalPhoneInput = ({
  phoneNumber,
  phoneNumberChange,
}: PhoneInputProps) => {
  const phoneNumberRefs = phoneNumber.map(() =>
    createRef<HTMLInputElement>()
  );

  const [phoneInputValue, setPhoneInputValue] = useState([
    ...phoneNumber,
  ]);

  const onInputChange =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const value = e.target.value;
      if (Number.isFinite(+value)) {
        phoneInputValue[index] = value;
        setPhoneInputValue(phoneInputValue);
        if (value === "") {
          //Goes to the previous input on backspace
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
      }
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
              value={phoneInputValue[index]}
              maxLength={index < 3 ? 2 : 1}
              ref={ref}
              onChange={onInputChange(index)}
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
