import Likes from "../components/UserHome/Likes";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LikesPage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <Likes />;
};

export default LikesPage;
