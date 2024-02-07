import Likes from "../components/UserHome/Likes";
import useAuthenticate from "../hooks/useAuthenticate";

const LikesPage: React.FC = () => {
  useAuthenticate();
  return <Likes />;
};

export default LikesPage;
