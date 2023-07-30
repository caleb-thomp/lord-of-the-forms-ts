import { allCities } from "./all-cities";
import { capitalize } from "./transformations";

export function isEmailValid(emailAddress: string) {
  const regex =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}
export function isPhoneNumberValid(phoneNumber: string[]) {
  const numberString = phoneNumber.join("");

  return numberString.length === 7;
}
export function isCityValid(city: string) {
  return allCities.includes(capitalize(city));
}

export function isLastNameValid(lastName: string) {
  return lastName.length > 1;
}
export function isFirstNameValid(firstName: string) {
  return firstName.length > 1;
}
