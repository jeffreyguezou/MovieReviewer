import Watched from "../components/UserHome/Watched";
import useAuthenticate from "../hooks/useAuthenticate";

const WatchedPage: React.FC = () => {
  useAuthenticate();
  return <Watched />;
};
export default WatchedPage;
