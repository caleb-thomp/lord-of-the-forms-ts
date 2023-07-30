export const capitalize = (name: string) => {
  return `${name.charAt(0).toUpperCase()}${name
    .slice(1)
    .toLowerCase()}`;
};

export const formatPhoneNumber = (
  phoneNumber: string[]
) => {
  return phoneNumber.join("-");
};

export const preventKeyingNumbers = (value: string) => {
  return value.replace(/\d/, "");
};
