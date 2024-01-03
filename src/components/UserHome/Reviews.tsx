import { useSelector } from "react-redux";
import { LoadingP } from "./WatchList";
import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import { MoviePoster, MovieTitle, MovieCard } from "./Watched";
import { FaRegStar } from "react-icons/fa";
import styled from "styled-components";

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

const Reviews = () => {
  const userData = useSelector((state) => state.app.users);
  const { userName } = useSelector((state) => state.auth);
  let userIndex;

  let selectedUser = userData.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });
  console.log(userIndex);
  console.log(userData[userIndex].reviews);
  let reviewData = userData[userIndex].reviews;

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
            console.log(reviewData);
            return (
              <ReviewDiv key={id}>
                <MovieCard>
                  {data && <MoviePoster src={data.Poster} />}
                  {data && (
                    <MovieTitle>
                      {data.Title} ({data.Year})
                    </MovieTitle>
                  )}
                </MovieCard>

                <div>
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
                </div>
                <div>
                  {reviewData.map((rev) => {
                    if (rev.imdbID === id) {
                      return rev.review;
                    }
                  })}
                </div>
              </ReviewDiv>
            );
          })}
        </PaddedDiv>
      </ContentBodyDiv>
    </>
  );
};
export default Reviews;
