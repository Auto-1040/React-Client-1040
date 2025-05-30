import { Dispatch, createContext } from "react"
import { User } from "../Types";
import { Action } from "./UserReducer";
export const emptyUser: User =
{
  username: "",
  email: '',
  password: '',
};


export const UserContext = createContext<{
  user: User;
  userDispatch: Dispatch<Action>;
}>({
  user: emptyUser,
  userDispatch: () => null
});

export default UserContext