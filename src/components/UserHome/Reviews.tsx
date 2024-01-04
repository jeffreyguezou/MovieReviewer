import { useSelector } from "react-redux";
import { LoadingP } from "./WatchList";
import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import { MoviePoster, MovieTitle, MovieCard, NoMovieMsg } from "./Watched";
import { FaRegStar } from "react-icons/fa";
import styled from "styled-components";
import { AppInterface, AuthState } from "../../util/interfaces";

const ContentBodyDiv = styled.div`
  padding: 1rem;
`;

const PaddedDiv = styled.div`
  padding: 0 10%;
`;
const ReviewDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #def;
  padding: 1rem 0;
  align-items: center;
  color: #def;
`;
const ReviewRow = styled.div`
  width: 33%;
  text-align: center;
  flex-wrap: wrap;
`;

const AlignedMovieCard = styled(MovieCard)`
  align-items: center;
`;

const Reviews = () => {
  const userData = useSelector((state: AppInterface) => state.app.users);
  const { userName } = useSelector((state: AuthState) => state.auth);
  let userIndex;

  let selectedUser = userData.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });

  let reviewData = userData[userIndex].reviews;

  if (reviewData.length === 0) {
    return <NoMovieMsg>No movies reviewed yet!</NoMovieMsg>;
  }

  return (
    <>
      <ContentBodyDiv>
        <PaddedDiv>
          {reviewData.map((review) => {
            console.log(review);
            let id = review.imdbID;
            const { isFetching, error, data } = useQuery({
              queryKey: ["review", id],
              queryFn: () => {
                return fetch(`http://www.omdbapi.com/?i=${id}&apikey=3f046e12`);
              },
            });
            if (isFetching) {
              return <LoadingP>Fetching...</LoadingP>;
            }

            return (
              <ReviewDiv key={id}>
                <ReviewRow>
                  <AlignedMovieCard>
                    {data && <MoviePoster src={data.Poster} />}
                    {data && (
                      <MovieTitle>
                        {data.Title} ({data.Year})
                      </MovieTitle>
                    )}
                  </AlignedMovieCard>
                </ReviewRow>

                <ReviewRow>
                  {reviewData.map((rev) => {
                    if (rev.imdbID === id) {
                      return (
                        <div>
                          {[...Array(rev.rating)].map((star, index) => {
                            return <FaRegStar color={"gold"} />;
                          })}
                        </div>
                      );
                    }
                  })}
                </ReviewRow>
                <ReviewRow>
                  {reviewData.map((rev) => {
                    if (rev.imdbID === id) {
                      return rev.review;
                    }
                  })}
                </ReviewRow>
              </ReviewDiv>
            );
          })}
        </PaddedDiv>
      </ContentBodyDiv>
    </>
  );
};
export default Reviews;
