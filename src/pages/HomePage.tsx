import UserHome from "../components/UserHome/UserHome";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthState } from "../util/interfaces";

const HomePage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state: AuthState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <UserHome />;
};
export default HomePage;
