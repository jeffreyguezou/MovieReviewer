import { useSelector } from "react-redux";
import { AppInterface } from "../util/interfaces";

type useGetUserIndexProps = {
  uName: string;
};

const useGetUserIndex = ({ uName }: useGetUserIndexProps) => {
  const appData = useSelector((state: AppInterface) => state.app);
  let uIndex;
  appData.users.map((user, index) => {
    if (user.userName === uName) {
      uIndex = index;
    }
  });
  return uIndex;
};
export default useGetUserIndex;
