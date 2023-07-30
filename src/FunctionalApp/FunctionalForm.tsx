import { FormEvent, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { UserFormData } from "../types";

import {
  isEmailValid,
  isPhoneNumberValid,
  isCityValid,
  isFirstNameValid,
  isLastNameValid,
} from "../utils/validations";
import {
  capitalize,
  formatPhoneNumber,
  preventKeyingNumbers,
} from "../utils/transformations";

import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { FunctionalInputProps } from "./FunctionalInputProps";

const firstNameErrorMessage =
  "First name must be at least 2 characters long";
const lastNameErrorMessage =
  "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  getUser,
}: UserFormData) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCity("");
    setPhoneNumber(["", "", "", ""]);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !isFirstNameValid(firstName) ||
      !isLastNameValid(lastName) ||
      !isEmailValid(email) ||
      !isCityValid(city) ||
      !isPhoneNumberValid(phoneNumber)
    ) {
      alert("Bad Input data");
      setIsSubmitted(true);
      return;
    }
    setIsSubmitted(false);
    getUser({
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      email: email,
      city: capitalize(city),
      phone: formatPhoneNumber(phoneNumber),
    });
    reset();
  };
  return (
    <form onSubmit={onSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* First Name */}

      <FunctionalInputProps
        label={"First Name"}
        inputProps={{
          type: "text",
          placeholder: "Bilbo",
          value: firstName,
          onChange: ({ target: { value } }) => {
            setFirstName(preventKeyingNumbers(value));
          },
        }}
      />

      {isSubmitted && !isFirstNameValid(firstName) && (
        <ErrorMessage
          message={firstNameErrorMessage}
          show={true}
        />
      )}

      {/* Last Name */}

      <FunctionalInputProps
        label={"Last Name"}
        inputProps={{
          type: "text",
          placeholder: "Baggins",
          value: lastName,
          onChange: ({ target: { value } }) => {
            setLastName(value);
          },
        }}
      />

      {isSubmitted && !isLastNameValid(lastName) && (
        <ErrorMessage
          message={lastNameErrorMessage}
          show={true}
        />
      )}
      {/* Email */}

      <FunctionalInputProps
        label={"Email"}
        inputProps={{
          type: "text",
          placeholder: "Bilbo-baggins@adventurehobbits.net",
          value: email,
          onChange: ({ target: { value } }) => {
            setEmail(value);
          },
        }}
      />

      {isSubmitted && !isEmailValid(email) && (
        <ErrorMessage
          message={emailErrorMessage}
          show={true}
        />
      )}
      {/* City */}

      <FunctionalInputProps
        label={"City"}
        inputProps={{
          type: "text",
          placeholder: "Hobbiton",
          value: city,
          list: "cities",
          onChange: ({ target: { value } }) => {
            setCity(preventKeyingNumbers(value));
          },
        }}
      />

      {isSubmitted && !isCityValid(city) && (
        <ErrorMessage
          message={cityErrorMessage}
          show={true}
        />
      )}

      {/* Phone Number  */}

      <FunctionalPhoneInput
        phoneNumber={phoneNumber}
        phoneNumberChange={setPhoneNumber}
      />

      {isSubmitted && !isPhoneNumberValid(phoneNumber) && (
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={true}
        />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
