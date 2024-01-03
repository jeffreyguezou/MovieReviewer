import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSliceActions } from "../../store/AppSlice";
import { useNavigate } from "react-router";

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

const SignUp = () => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mailChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredMail(event.currentTarget.value);
  };
  const userNameChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredUserName(event.currentTarget.value);
  };

  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredPassword(event.currentTarget.value);
  };

  const createNewUserHandler = () => {
    let user = {
      userName: enteredUserName,
      password: enteredPassword,
      email: enteredMail,
      movies: {
        watched: [],
        liked: [],
        watchlist: [],
      },
      reviews: [],
    };
    console.log(user);
    dispatch(AppSliceActions.addUser(user));
    navigate("/signin");
  };

  const navToSignInHandler = () => {
    navigate("/signin");
  };

  return (
    <BodyDiv>
      <InputDiv>
        <label>EMAIL ADDRESS</label>
        <input value={enteredMail} onChange={mailChangeHandler} type="email" />
      </InputDiv>
      <InputDiv>
        <label>USER NAME</label>
        <input
          value={enteredUserName}
          onChange={userNameChangeHandler}
          type="text"
        />
      </InputDiv>
      <InputDiv>
        <label>PASSWORD</label>
        <input
          value={enteredPassword}
          onChange={passwordChangeHandler}
          type="password"
        />
      </InputDiv>
      <SignUpBtn onClick={createNewUserHandler}>Sign Up</SignUpBtn>
      <UserMsgP>
        Already an user? <NavSpan onClick={navToSignInHandler}>Sign in</NavSpan>
      </UserMsgP>
    </BodyDiv>
  );
};
export default SignUp;
