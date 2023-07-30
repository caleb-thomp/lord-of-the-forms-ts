import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { State, UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component<
  Record<string, never>,
  State
> {
  state: State = {
    userInformation: null,
  };

  render() {
    const { userInformation } = this.state;

    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={userInformation} />
        <ClassForm
          getUser={(userInformation: UserInformation) => {
            this.setState({
              userInformation: userInformation,
            });
          }}
        />
      </>
    );
  }
}
