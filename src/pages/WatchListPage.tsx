import WatchList from "../components/UserHome/WatchList";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const WatchListPage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <WatchList />;
};
export default WatchListPage;
