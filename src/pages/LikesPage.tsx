import Likes from "../components/UserHome/Likes";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthState } from "../util/interfaces";

const LikesPage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state: AuthState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <Likes />;
};

export default LikesPage;
