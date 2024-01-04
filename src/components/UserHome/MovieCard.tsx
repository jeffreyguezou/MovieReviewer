import styled from "styled-components";
import ReviewBox from "./ReviewBox";
import { useDispatch, useSelector } from "react-redux";
import { AppSliceActions } from "../../store/AppSlice";
import { AppInterface, AuthState } from "../../util/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NoMovieMsg } from "./Watched";

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

  const { userName } = useSelector((state: AuthState) => state.auth);
  const appData = useSelector((state: AppInterface) => state.app);

  let userIndex,
    likedIDs: {},
    watchedIDs: {},
    watchListIDs: {},
    reviewedIDs: [],
    prevReviewedMovies: any[];
  let content;

  appData.users.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });

  const selectedUserData = appData.users[userIndex];

  likedIDs = selectedUserData.movies.liked;
  watchedIDs = selectedUserData.movies.watched;
  watchListIDs = selectedUserData.movies.watchlist;
  reviewedIDs = selectedUserData.reviews;
  prevReviewedMovies = reviewedIDs.map((review) => review.imdbID);

  const getUserFeedBack = (
    isWatched: boolean,
    isLiked: boolean,
    isWatchListed: boolean,
    userReview: string,
    rating: number
  ) => {
    let movieID = props.data.imdbID;

    if (isLiked) {
      if (!likedIDs.hasOwnProperty(movieID)) {
        dispatch(
          AppSliceActions.addLikes({
            userName,
            movieID,
          })
        );
      }
    }

    //Add to respective state only if not previously existing
    if (isWatchListed) {
      if (!watchListIDs.hasOwnProperty(movieID)) {
        dispatch(AppSliceActions.addWatchlist({ userName, movieID }));
      }
    }
    if (isWatched) {
      if (!watchedIDs.hasOwnProperty(movieID)) {
        dispatch(AppSliceActions.addWatched({ userName, movieID }));
      }
    }
    if (rating || userReview) {
      prevReviewedMovies = reviewedIDs.map((review) => review.imdbID);

      let reviewDetails = {
        imdbID: movieID,
        review: userReview,
        rating,
      };
      if (!prevReviewedMovies.includes(movieID)) {
        dispatch(AppSliceActions.addUserReview({ userName, reviewDetails }));
      } else {
        reviewedIDs = reviewedIDs.filter((rev) => {
          return rev.imdbID !== movieID;
        });
        reviewedIDs.push(reviewDetails);
        dispatch(
          AppSliceActions.replaceUserReview({
            userName,
            allUserReviews: reviewedIDs,
          })
        );
      }
    }

    //Remove only if present in existing array
    if (likedIDs.hasOwnProperty(movieID)) {
      if (!isLiked) {
        dispatch(AppSliceActions.removeLike({ userName, movieID }));
      }
    }
    if (watchedIDs.hasOwnProperty(movieID)) {
      if (!isWatched) {
        dispatch(AppSliceActions.removeWatched({ userName, movieID }));
      }
    }
    if (watchListIDs.hasOwnProperty(movieID)) {
      if (!isWatchListed) {
        dispatch(AppSliceActions.removeWatchlist({ userName, movieID }));
      }
    }
    toast.success("Done");
  };

  if (props.data.Response === "False") {
    content = <NoMovieMsg>No movie found!</NoMovieMsg>;
  } else {
    content = (
      <MovieDiv>
        <ImgCard>
          <CroppedImg src={props.data.Poster} />
        </ImgCard>
        <DetailsDiv>
          <StyledTitle>
            {props.data.Title}({props.data.Year})
          </StyledTitle>
          <StyledPlot>{props.data.Plot}</StyledPlot>
          <YearDirectorText>
            Directed by: {props.data.Director}
          </YearDirectorText>
          <YearDirectorText>Actors: {props.data.Actors}</YearDirectorText>
          <YearDirectorText>Genre: {props.data.Genre}</YearDirectorText>
          <YearDirectorText>
            IMDb Rating: {props.data.imdbRating}
          </YearDirectorText>
        </DetailsDiv>

        <ReviewBox
          movieID={props.data.imdbID}
          getUserFeedBack={getUserFeedBack}
        />
      </MovieDiv>
    );
  }

  return (
    <>
      <ToastContainer />
      {content}
    </>
  );
};
export default MovieCard;
