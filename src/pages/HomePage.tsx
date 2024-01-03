import UserHome from "../components/UserHome/UserHome";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <UserHome />;
};
export default HomePage;
