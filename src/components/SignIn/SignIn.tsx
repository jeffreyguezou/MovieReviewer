import { useState } from "react";
import {
  BodyDiv,
  InputDiv,
  SignUpBtn,
  NavSpan,
  UserMsgP,
  StyledInput,
} from "../SignUp/SignUp";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { AppInterface } from "../../util/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [userNameEmpty, setUserNameEmpty] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  let storedUsers = useSelector((state: AppInterface) => state.app.users);

  const userNameChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredUserName(event.currentTarget.value);
    setUserNameEmpty(false);
  };
  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredPassword(event.currentTarget.value);
    setPasswordInvalid(false);
  };

  const signinHandler = () => {
    let userFoundFlag = false;
    if (enteredUserName === "") {
      setUserNameEmpty(true);
    }
    if (enteredPassword === "") {
      setPasswordInvalid(true);
    }

    if (storedUsers.length == 0) {
      toast("No users found. Please sign up");
    } else {
      storedUsers.map((user: any) => {
        if (user.userName === enteredUserName) {
          userFoundFlag = true;
          if (user.password === enteredPassword) {
            dispatch(
              authActions.login({ isLoggedIn: true, userName: enteredUserName })
            );
            navigate("/home");
          } else {
            toast.warning("Password Invalid");
          }
        } else if (!userFoundFlag) {
          toast.warning("Invalid User, Please Sign Up");
        }
      });
    }
  };

  const navToSignUpHandler = () => {
    navigate("/signup");
  };

  return (
    <BodyDiv>
      <ToastContainer />
      <InputDiv>
        <label>User Name</label>
        <StyledInput
          onChange={userNameChangeHandler}
          value={enteredUserName}
          type="text"
          valid={!userNameEmpty}
        />
      </InputDiv>
      <InputDiv>
        <label>Password</label>
        <StyledInput
          value={enteredPassword}
          onChange={passwordChangeHandler}
          type="password"
          valid={!passwordInvalid}
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
