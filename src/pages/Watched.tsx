import Watched from "../components/UserHome/Watched";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const WatchedPage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <Watched />;
};
export default WatchedPage;
