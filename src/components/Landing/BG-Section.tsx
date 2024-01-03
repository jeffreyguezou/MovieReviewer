import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import styled from "styled-components";
import bgimg from "../../assets/PoorThings2023.jpg";
import { useNavigate } from "react-router";

const BGContainer = styled.div`
  height: 100vh;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
`;

const BGdiv = styled.div<Custom>`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgimg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  position: absolute;
  width: 100%;
`;

const BGWrapper = styled.div`
  height: 675px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 1200px;
  z-index: 0;
  background-image: linear-gradient(
    to bottom,
    #14181c 20%,
    #14181c 10%,
    #2c3440 20%)
  );
`;

const WelcomeMsg = styled.div`
  padding-top: 400px;
  position: relative;
  font-size: 2.76923077rem;
  line-height: 1.33333333;
  margin-bottom: 0;
  color: #def;
  text-align: center;
`;
const StartBtn = styled.button`
  background: #00c030;
  color: #fff;
  font-size: 1.23076923rem;
  padding: 0.625em 1.5em;
  letter-spacing: 0.075em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 10px;
`;

type Custom = {
  bgimg: string;
};

const BGSection = () => {
  const navigate = useNavigate();
  const { status, error, data } = useQuery({
    queryKey: ["randommovie"],
    queryFn: () =>
      fetch(" http://www.omdbapi.com/?i=tt3896198&apikey=3f046e12"),
    //fetch("https://api.trakt.tv/calendars/all/movies/2014-09-01/7"),
  });
  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error {error.message}</p>;

  const startClickHandler = () => {
    navigate("/signup");
  };

  return (
    <BGContainer>
      <BGWrapper>
        <BGdiv bgimg={bgimg}>
          <WelcomeMsg>
            Track films you’ve watched.
            <br /> Save those you want to see.
            <br /> Tell your friends what’s good.
            <br />
            <StartBtn onClick={startClickHandler}>Get Started!</StartBtn>
          </WelcomeMsg>
        </BGdiv>
      </BGWrapper>
    </BGContainer>
  );
};
export default BGSection;
