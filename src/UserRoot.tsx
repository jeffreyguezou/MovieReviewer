import { Outlet } from "react-router-dom";
import UserNav from "./components/UserHome/UserNav";
import styled from "styled-components";

const PageLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const UserRoot = () => {
  return (
    <PageLayout>
      <UserNav />
      <Outlet />
    </PageLayout>
  );
};
export default UserRoot;
