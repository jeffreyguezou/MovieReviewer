import Reviews from "../components/UserHome/Reviews";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ReviewsPage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, []);
  return <Reviews />;
};

export default ReviewsPage;
