import WatchList from "../components/UserHome/WatchList";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthState } from "../util/interfaces";

const WatchListPage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state: AuthState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <WatchList />;
};
export default WatchListPage;
