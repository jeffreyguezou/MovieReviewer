import styled from "styled-components";
import { LuEye, LuHeart } from "react-icons/lu";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { SignUpBtn } from "../SignUp/SignUp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ReviewAside = styled.aside`
  float: right;
  margin-right: 0;
  width: 270px;
  background-color: #445566;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const ReviewBoxDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 1rem;
`;

const HiddenRadio = styled.input`
  display: none;
`;
const RatingLabel = styled.label``;

const StarDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 4px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  text-align: center;
  font-size: 1.2rem;
`;
const BtnDiv = styled.div`
  text-align: center;
`;

const StyledTextArea = styled.textarea`
  height: 90px;
  border-radius: 5px;
`;

const ReviewBox = ({ ...props }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isWatched, setIsWatched] = useState();
  const [isLiked, setIsLiked] = useState();
  const [isWatchListed, setIsWatchListed] = useState();
  const [liked, setLiked] = useState(false);
  const [userReview, setUserReview] = useState("");
  const navigate = useNavigate();

  let initialLike;

  const appData = useSelector((state) => state.app);
  const { userName } = useSelector((state) => state.auth);
  let userIndex;

  let selectedUser = appData.users.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });
  console.log(appData);
  let selectedUserData = appData.users[userIndex];
  console.log(selectedUserData);
  const likedIDs = selectedUserData.movies.liked;
  const watchedIDs = selectedUserData.movies.watched;
  const watchListIDs = selectedUserData.movies.watchlist;

  console.log(props);
  console.log(props.intialLike);

  if (likedIDs.includes(props.movieID)) {
    console.log("liked");
  }
  if (watchListIDs.includes(props.movieID)) {
    console.log("watch listed");
  }
  if (watchedIDs.includes(props.movieID)) {
    console.log("watched");
  }

  let watchText = isWatched ? "Watched" : "Watch";
  let likeText = isLiked ? "Liked" : "Like";
  let watchListText = isWatchListed ? "Added" : "Watchlist";

  const saveHandler = () => {
    props.getUserFeedBack(
      isWatched,
      isLiked,
      isWatchListed,
      userReview,
      rating
    );
  };

  const reviewChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setUserReview(event.currentTarget.value);
  };

  const style = { fontSize: "1.5rem" };
  return (
    <ReviewAside>
      <ReviewBoxDiv>
        <ActionDiv>
          <LuEye
            color={isWatched ? "green" : "#e4e5e9"}
            onClick={() => setIsWatched(!isWatched)}
            style={style}
          />
          <label>{watchText}</label>
        </ActionDiv>
        <ActionDiv>
          <LuHeart
            color={isLiked ? "red" : "#e4e5e9"}
            style={style}
            onClick={() => setIsLiked(!isLiked)}
          />
          {props.initalLike && <LuHeart color={"red"}></LuHeart>}

          <label>{likeText}</label>
        </ActionDiv>
        <ActionDiv>
          <MdOutlinePlaylistAdd
            color={isWatchListed ? "gold" : "#e4e5e9"}
            style={style}
            onClick={() => setIsWatchListed(!isWatchListed)}
          />
          <label>{watchListText}</label>
        </ActionDiv>
      </ReviewBoxDiv>
      <InputDiv>
        <label>Rating</label>
        <StarDiv>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <RatingLabel key={currentRating}>
                <HiddenRadio
                  type="radio"
                  id="rating"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                />
                <FaRegStar
                  color={
                    currentRating <= (hover || rating) ? "#ffc107" : "e4e5e9"
                  }
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onMouseEnter={() => {
                    setHover(currentRating);
                  }}
                  onMouseLeave={() => {
                    setHover(0);
                  }}
                />
              </RatingLabel>
            );
          })}
        </StarDiv>
      </InputDiv>
      <InputDiv>
        <label>Review</label>
        <StyledTextArea
          value={userReview}
          onChange={reviewChangeHandler}
        ></StyledTextArea>
      </InputDiv>
      <BtnDiv>
        <SignUpBtn onClick={saveHandler}>Save</SignUpBtn>
      </BtnDiv>
    </ReviewAside>
  );
};
export default ReviewBox;
