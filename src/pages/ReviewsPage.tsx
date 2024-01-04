import Reviews from "../components/UserHome/Reviews";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthState } from "../util/interfaces";

const ReviewsPage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state: AuthState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <Reviews />;
};

export default ReviewsPage;
