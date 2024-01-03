import { Outlet } from "react-router-dom";
import NavBar from "./components/Landing/NavBar";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default RootLayout;
