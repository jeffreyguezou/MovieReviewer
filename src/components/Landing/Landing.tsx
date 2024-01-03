import BGSection from "./BG-Section";
import styled from "styled-components";

const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
`;

const Landing = () => {
  return (
    <MainDiv>
      <BGSection />
    </MainDiv>
  );
};
export default Landing;
