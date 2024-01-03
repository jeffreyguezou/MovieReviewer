import { useState } from "react";
import {
  BodyDiv,
  InputDiv,
  SignUpBtn,
  NavSpan,
  UserMsgP,
} from "../SignUp/SignUp";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  let storedUsers = useSelector((state) => state.app.users);
  console.log(storedUsers);

  const userNameChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredUserName(event.currentTarget.value);
  };
  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredPassword(event.currentTarget.value);
  };

  const signinHandler = () => {
    let userFoundFlag = false;

    if (storedUsers.length == 0) {
      alert("No users found. Please sign up");
    } else {
      storedUsers.map((user: any) => {
        console.log(user, enteredUserName);
        if (user.userName === enteredUserName) {
          userFoundFlag = true;
          if (user.password === enteredPassword) {
            console.log("valid user");
            dispatch(
              authActions.login({ isLoggedIn: true, userName: enteredUserName })
            );
            navigate("/home");
          } else {
            alert("Password Invalid");
          }
        }
      });
    }
  };

  const navToSignUpHandler = () => {
    navigate("/signup");
  };

  return (
    <BodyDiv>
      <InputDiv>
        <label>User Name</label>
        <input
          onChange={userNameChangeHandler}
          value={enteredUserName}
          type="text"
        />
      </InputDiv>
      <InputDiv>
        <label>Password</label>
        <input
          value={enteredPassword}
          onChange={passwordChangeHandler}
          type="password"
        />
      </InputDiv>
      <SignUpBtn onClick={signinHandler}>Sign In</SignUpBtn>
      <UserMsgP>
        New user? <NavSpan onClick={navToSignUpHandler}>sign up</NavSpan>
      </UserMsgP>
    </BodyDiv>
  );
};
export default SignIn;
