import styled from "styled-components";
import { LuEye, LuHeart } from "react-icons/lu";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { SignUpBtn } from "../SignUp/SignUp";
import { useSelector } from "react-redux";
import { AppInterface, AuthState } from "../../util/interfaces";
import { review } from "../../util/interfaces";

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
  const [isWatched, setIsWatched] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isWatchListed, setIsWatchListed] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);

  const appData = useSelector((state: AppInterface) => state.app);
  const { userName } = useSelector((state: AuthState) => state.auth);
  let userIndex,
    selectedUserData,
    likedIDs: {},
    watchedIDs: {},
    watchListIDs: {},
    reviewedIDs: review[],
    prevReviewedMovies: string[];

  appData.users.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });

  if (userIndex) {
    selectedUserData = appData.users[userIndex];
  }

  if (selectedUserData) {
    likedIDs = selectedUserData.movies.liked;
    watchedIDs = selectedUserData.movies.watched;
    watchListIDs = selectedUserData.movies.watchlist;
    reviewedIDs = selectedUserData.reviews;

    useEffect(() => {
      prevReviewedMovies = reviewedIDs.map((review) => review.imdbID);
      if (likedIDs.hasOwnProperty(props.movieID)) {
        setIsLiked(true);
      }
      if (watchListIDs.hasOwnProperty(props.movieID)) {
        console.log("watch listed");
        setIsWatchListed(true);
      }
      if (watchedIDs.hasOwnProperty(props.movieID)) {
        console.log("watched");
        setIsWatched(true);
      }

      if (prevReviewedMovies.includes(props.movieID)) {
        reviewedIDs.map((review, index) => {
          if (review.imdbID === props.movieID) {
            setUserReview(review.review);
            setRating(review.rating);
            setIsAlreadyReviewed(true);
          }
        });
      }
    }, [props.movieID, likedIDs, watchListIDs, watchedIDs, reviewedIDs]);
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

  const reviewChangeHandler = (event: React.FormEvent<HTMLTextAreaElement>) => {
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
        <StarDiv
        // style={disableStar}
        >
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
