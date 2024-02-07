import WatchList from "../components/UserHome/WatchList";
import useAuthenticate from "../hooks/useAuthenticate";

const WatchListPage: React.FC = () => {
  useAuthenticate();
  return <WatchList />;
};
export default WatchListPage;
