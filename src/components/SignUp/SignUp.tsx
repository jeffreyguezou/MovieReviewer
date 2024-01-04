import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppSliceActions } from "../../store/AppSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { AppInterface } from "../../util/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BodyDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1c2229;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
export const InputDiv = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const SignUpBtn = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
  background-color: #1c2229;
  color: #def;
  &: hover {
    background-color: #def;
    color: #1c2229;
  }
  &: focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

export const UserMsgP = styled.p`
  font-size: 12px;
  margin-top: -10px;
`;

export const NavSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const ValidationMsg = styled.span`
  color: red;
`;

export const StyledInput = styled.input<Custom>`
  font-size: 18px;
  padding: 4px;
  border: 1px solid;
  border-radius: 2px;
  &: focus {
    outline: 4px auto #0063d6;
  }
  &: focus-visible {
    outline: 4px auto #0063d6;
  }
  background-color: ${(props) => (props.valid ? "white" : "#f9dee3")};
`;
type Custom = {
  valid: boolean;
};

const SignUp = () => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [mailEmpty, setMailEmpty] = useState(false);
  const [userNameEmpty, setUserNameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  let userFound: boolean;

  let storedUsers = useSelector((state: AppInterface) => state.app.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mailChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredMail(event.currentTarget.value);
    setMailEmpty(false);
  };
  const userNameChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredUserName(event.currentTarget.value);
    setUserNameEmpty(false);
  };

  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredPassword(event.currentTarget.value);
    setPasswordEmpty(false);
  };

  const createNewUserHandler = () => {
    if (enteredMail === "") {
      setMailEmpty(true);
    } else if (enteredUserName === "") {
      setUserNameEmpty(true);
    } else if (enteredPassword === "") {
      setPasswordEmpty(true);
    } else {
      storedUsers.map((user) => {
        if (user.userName === enteredUserName) {
          toast.warn("User already exists. Try a different User Name");
          userFound = true;
        }
      });
      if (!userFound) {
        let user = {
          userName: enteredUserName,
          password: enteredPassword,
          email: enteredMail,
          movies: {
            watched: {},
            liked: {},
            watchlist: {},
          },
          reviews: [],
        };

        dispatch(AppSliceActions.addUser(user));
        navigate("/signin");
      }
    }
  };

  const navToSignInHandler = () => {
    navigate("/signin");
  };

  return (
    <BodyDiv>
      <ToastContainer />
      <InputDiv>
        <label>EMAIL ADDRESS</label>
        <StyledInput
          value={enteredMail}
          onChange={mailChangeHandler}
          type="email"
          valid={!mailEmpty}
        />
        {mailEmpty && <ValidationMsg>Required</ValidationMsg>}
      </InputDiv>
      <InputDiv>
        <label>USER NAME</label>
        <StyledInput
          value={enteredUserName}
          onChange={userNameChangeHandler}
          type="text"
          valid={!userNameEmpty}
        />
        {userNameEmpty && <ValidationMsg>Required</ValidationMsg>}
      </InputDiv>
      <InputDiv>
        <label>PASSWORD</label>
        <StyledInput
          value={enteredPassword}
          onChange={passwordChangeHandler}
          type="password"
          valid={!passwordEmpty}
        />
        {passwordEmpty && <ValidationMsg>Required</ValidationMsg>}
      </InputDiv>
      <SignUpBtn onClick={createNewUserHandler}>Sign Up</SignUpBtn>
      <UserMsgP>
        Already an user? <NavSpan onClick={navToSignInHandler}>Sign in</NavSpan>
      </UserMsgP>
    </BodyDiv>
  );
};
export default SignUp;
