import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthState } from "../util/interfaces";
const useAuthenticate = () => {
  let navigate = useNavigate();
  let isLoggedIn = useSelector((state: AuthState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
};
export default useAuthenticate;
