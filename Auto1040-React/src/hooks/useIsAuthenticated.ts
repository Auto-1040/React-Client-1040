import { useContext } from "react";
import UserContext from "../components/user/UserContext";

export const useIsAuthenticated = (): boolean => {
  const { user } = useContext(UserContext);
  if(user.id)
    return true;
  return false;
};