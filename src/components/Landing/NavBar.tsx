import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/AuthSlice";
import { AuthState } from "../../util/interfaces";
import { SignUpBtn } from "../SignUp/SignUp";

const StyledNav = styled.nav`
  background-image: linear-gradient(
    180deg,
    #14181c 0,
    rgba(20, 24, 28, 0.945) 16.56%,
    rgba(20, 24, 28, 0.802) 30.85%,
    rgba(20, 24, 28, 0.606) 43.77%,
    rgba(20, 24, 28, 0.394) 56.23%,
    rgba(20, 24, 28, 0.198) 69.15%,
    rgba(20, 24, 28, 0.055) 83.44%,
    rgba(20, 24, 28, 0)
  );
  background-repeat: repeat-x;
  height: 95px;
  left: 0;
  opacity: 0.7;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  width: 98%;
  justify-content: space-between;
  background-color: transparent;
  color: white;
  padding-left: 1rem;
  a {
    text-decoration: none;
    &: hover {
      font-weight: bold;
      text-decoration: underline;
    }
    &: active {
      color: white;
    }
    &: -webkit-any-link {
      color: white;
    }
  }
  z-index: 1;
`;
const StyledUl = styled.ul`
  display: flex;
  gap: 1rem;
`;
const PaddedDiv = styled.div`
  margin: 1em;
  font-weight: bold;
`;

const LogOutBtn = styled(SignUpBtn)`
  margin: -1rem 1rem;
`;

const NavBar = () => {
  const { isLoggedIn } = useSelector((state: AuthState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <>
      <StyledNav>
        <PaddedDiv>
          <p>MovieReviewer</p>
        </PaddedDiv>
        <PaddedDiv>
          {!isLoggedIn && (
            <StyledUl>
              <Link to={"/signup"}>Create Account</Link>
              <Link to={"/signin"}>Sign in</Link>
            </StyledUl>
          )}
          {isLoggedIn && (
            <StyledUl>
              <LogOutBtn onClick={logoutHandler}>Log Out</LogOutBtn>
            </StyledUl>
          )}
        </PaddedDiv>
      </StyledNav>
    </>
  );
};
export default NavBar;
