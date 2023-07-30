import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

import { UserInformation } from "../types";
import { useState } from "react";

export const FunctionalApp = () => {
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userInformation} />
      <FunctionalForm
        getUser={(userInformation) => {
          setUserInformation(userInformation);
        }}
      />
    </>
  );
};
