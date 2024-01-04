import Watched from "../components/UserHome/Watched";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthState } from "../util/interfaces";

const WatchedPage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state: AuthState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <Watched />;
};
export default WatchedPage;
