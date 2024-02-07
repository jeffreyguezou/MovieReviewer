import Reviews from "../components/UserHome/Reviews";
import useAuthenticate from "../hooks/useAuthenticate";

const ReviewsPage: React.FC = () => {
  useAuthenticate();
  return <Reviews />;
};

export default ReviewsPage;
