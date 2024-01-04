import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../../util/interfaces";

const StyledNav = styled.nav`
  display: flex;
  width: 84%;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: #2c3440;
  color: #def;
  font-size: 1rem;
  a {
    text-decoration: none;
    color: #def;
    &: hover {
      color: #40bcf4;
    }
    &: active {
      color: white;
    }
    &: -webkit-any-link {

    }
  }
`;
const StyledUl = styled.ul`
  display: flex;
  gap: 1rem;
`;
const HomeNavP = styled.p`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
`;

const UserNavDiv = styled.div`
  padding-top: 7%;
  padding-left: 10%;
`;
const UserNav = () => {
  const navigate = useNavigate();
  const { userName } = useSelector((state: AuthState) => state.auth);

  const navigateHomeHandler = () => {
    navigate("/home");
  };

  return (
    <UserNavDiv>
      <StyledNav>
        <HomeNavP onClick={navigateHomeHandler}>{userName}</HomeNavP>
        <StyledUl>
          <Link to={"watched"}>WATCHED</Link>
          <Link to={"reviews"}>REVIEWS</Link>
          <Link to={"watchlist"}>WATCHLIST</Link>
          <Link to={"likes"}>LIKES</Link>
        </StyledUl>
      </StyledNav>
    </UserNavDiv>
  );
};
export default UserNav;
