import { Component, FormEvent } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassPhoneInput } from "./ClassPhoneInput";
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
import { ClassInputProps } from "./ClassInputProps";
import { UserFormData } from "../types";

const firstNameErrorMessage =
  "First name must be at least 2 characters long";
const lastNameErrorMessage =
  "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<UserFormData> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phoneNumber: ["", "", "", ""],
    isSubmitted: false,
  };
  reset = () => {
    this.setState({ firstName: "" });
    this.setState({ lastName: "" });
    this.setState({ inputCity: "" });
    this.setState({ inputEmail: "" });
    this.setState({ inputPhoneNumber: ["", "", "", ""] });
  };

  onPhoneNumberChange = (phoneNumber: string[]) => {
    this.setState({ phoneNumber: phoneNumber });
  };

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      city,
      phoneNumber,
    } = this.state;
    if (
      !isFirstNameValid(firstName) ||
      !isLastNameValid(lastName) ||
      !isEmailValid(email) ||
      !isCityValid(city) ||
      !isPhoneNumberValid(phoneNumber)
    ) {
      alert("Bad Input data");
      this.setState({ isSubmitted: true });
      return;
    }
    this.setState({ isSubmitted: false });
    this.props.getUser({
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      email: email,
      city: capitalize(city),
      phone: formatPhoneNumber(phoneNumber),
    });
    this.reset();
  };
  render() {
    const {
      firstName,
      lastName,
      email,
      city,
      phoneNumber,
      isSubmitted,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* First Name */}
        <div className="input-wrap">
          <ClassInputProps
            label={"First Name"}
            inputProps={{
              type: "text",
              placeholder: "Bilbo",
              value: firstName,
              onChange: ({ target: { value } }) => {
                this.setState({
                  firstName: preventKeyingNumbers(value),
                });
              },
            }}
          />
        </div>

        {isSubmitted && !isFirstNameValid(firstName) && (
          <ErrorMessage
            message={firstNameErrorMessage}
            show={true}
          />
        )}

        {/* Last Name */}
        <div className="input-wrap">
          <ClassInputProps
            label={"Last Name"}
            inputProps={{
              type: "text",
              placeholder: "Baggins",
              value: lastName,
              onChange: ({ target: { value } }) => {
                this.setState({ lastName: value });
              },
            }}
          />
        </div>
        {isSubmitted && !isLastNameValid(lastName) && (
          <ErrorMessage
            message={lastNameErrorMessage}
            show={true}
          />
        )}

        {/* Email */}
        <div className="input-wrap">
          <ClassInputProps
            label={"Email"}
            inputProps={{
              type: "text",
              placeholder:
                "Bilbo-baggins@adventurehobbits.net",
              value: email,
              onChange: ({ target: { value } }) => {
                this.setState({ email: value });
              },
            }}
          />
        </div>
        {isSubmitted && !isEmailValid(email) && (
          <ErrorMessage
            message={emailErrorMessage}
            show={true}
          />
        )}

        {/* City */}
        <div className="input-wrap">
          <ClassInputProps
            label={"City"}
            inputProps={{
              type: "text",
              placeholder: "Hobbiton",
              value: city,
              list: "cities",
              onChange: ({ target: { value } }) => {
                this.setState({
                  city: preventKeyingNumbers(value),
                });
              },
            }}
          />
        </div>

        {isSubmitted && !isCityValid(city) && (
          <ErrorMessage
            message={cityErrorMessage}
            show={true}
          />
        )}

        <ClassPhoneInput
          phoneNumber={phoneNumber}
          phoneNumberChange={this.onPhoneNumberChange}
        />

        {isSubmitted &&
          !isPhoneNumberValid(phoneNumber) && (
            <ErrorMessage
              message={phoneNumberErrorMessage}
              show={true}
            />
          )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
