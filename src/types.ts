export type UserInformation = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
};

export type State = {
  userInformation: UserInformation | null;
};

export type UserFormData = {
  getUser: (userInformation: UserInformation) => void;
};

export type PhoneInputProps = {
  phoneNumber: string[];
  phoneNumberChange: (phoneNumber: string[]) => void;
};
