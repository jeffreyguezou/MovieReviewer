import styled from "styled-components";
import ReviewBox from "./ReviewBox";
import { useDispatch, useSelector } from "react-redux";
import { AppSliceActions } from "../../store/AppSlice";
import { useState } from "react";

const ImgCard = styled.div`
  width: 230px;
  height: 345px;
`;
export const CroppedImg = styled.img`
  width: 230px;
  height: 345px;
`;

const MovieDiv = styled.div`
  display: flex;
  color: #def;
  padding: 1rem;
`;

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const YearDirectorText = styled.p`
  color: #9ab;
  margin: 10px 0;
  text-align: center;
`;
const StyledTitle = styled.h1`
  text-align: center;
`;
const StyledPlot = styled.article`
  padding: 0 20px;
`;

const MovieCard = ({ ...props }) => {
  const dispatch = useDispatch();

  const { userName } = useSelector((state) => state.auth);
  const appData = useSelector((state) => state.app);
  //const [initialLike, setInitialLike] = useState(false);
  console.log(appData);
  console.log(userName);

  let isInitiallyLiked = false;

  let userIndex;

  let selectedUser = appData.users.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });

  let selectedUserData = appData.users[userIndex];
  console.log(selectedUserData);
  const likedIDs = selectedUserData.movies.liked;
  const watchedIDs = selectedUserData.movies.watched;
  const watchListIDs = selectedUserData.movies.watchlist;

  console.log(likedIDs);

  if (likedIDs.includes(props.data.imdbID)) {
    isInitiallyLiked = true;
    console.log("set true");
    console.log(isInitiallyLiked);
  }

  const getUserFeedBack = (
    isWatched: boolean,
    isLiked: boolean,
    isWatchListed: boolean,
    userReview: string,
    rating: number
  ) => {
    let movieID = props.data.imdbID;

    if (isLiked) {
      console.log("enetered");
      if (!likedIDs.includes(movieID)) {
        console.log("already liked");
        dispatch(AppSliceActions.addLikes({ userName, movieID }));
      }
    }
    if (isWatchListed) {
      if (!watchListIDs.includes(movieID)) {
        dispatch(AppSliceActions.addWatchlist({ userName, movieID }));
      }
    }
    if (isWatched) {
      if (!watchedIDs.includes(movieID)) {
        dispatch(AppSliceActions.addWatched({ userName, movieID }));
      }
    }
    if (rating || userReview) {
      let reviewDetails = {
        imdbID: movieID,
        review: userReview,
        rating,
      };

      dispatch(AppSliceActions.addUserReview({ userName, reviewDetails }));
    }
  };

  return (
    <MovieDiv>
      <ImgCard>
        <CroppedImg src={props.data.Poster} />
      </ImgCard>
      <DetailsDiv>
        <StyledTitle>
          {props.data.Title}({props.data.Year})
        </StyledTitle>
        <StyledPlot>{props.data.Plot}</StyledPlot>
        <YearDirectorText>Directed by: {props.data.Director}</YearDirectorText>
        <YearDirectorText>Actors: {props.data.Actors}</YearDirectorText>
        <YearDirectorText>Genre: {props.data.Genre}</YearDirectorText>
        <YearDirectorText>
          IMDb Rating: {props.data.imdbRating}
        </YearDirectorText>
      </DetailsDiv>
      <ReviewBox
        intialLike={isInitiallyLiked}
        movieID={props.data.imdbID}
        getUserFeedBack={getUserFeedBack}
      />
    </MovieDiv>
  );
};
export default MovieCard;
