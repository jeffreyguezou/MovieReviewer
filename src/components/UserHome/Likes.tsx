import styled from "styled-components";
import { MoviePoster, MovieTitle, MovieCard } from "./Watched";
import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import { ContentDiv, CardContentHolder } from "./WatchList";
import { useSelector } from "react-redux";
import { AppInterface, AuthState } from "../../util/interfaces";

const Border = styled.div`
  height: 10px;
  border-bottom: 1px solid #445566;
`;

const WatchListText = styled.span`
  color: #9ab;
  font-size: 1rem;
  font-weight: 400;
`;

//const IDs = ["tt0054215", "tt0068646", "tt1392170"];

const Likes = () => {
  const appData = useSelector((state: AppInterface) => state.app);
  const { userName } = useSelector((state: AuthState) => state.auth);

  let userIndex;

  appData.users.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });

  const selectedUserData = appData.users[userIndex];

  const IDs = selectedUserData.movies.liked;
  return (
    <ContentDiv>
      <WatchListText>You liked {Object.keys(IDs).length} movies</WatchListText>
      <Border></Border>
      <CardContentHolder>
        {Object.keys(IDs).map((id) => {
          const { isFetching, data } = useQuery({
            queryKey: ["movie", id],
            queryFn: () => {
              return fetch(`http://www.omdbapi.com/?i=${id}&apikey=3f046e12`);
            },
          });

          if (isFetching) {
            return <p key={id}>Fetching...</p>;
          }

          return (
            <MovieCard key={id}>
              {data && <MoviePoster src={data.Poster}></MoviePoster>}
              {data && <MovieTitle>{data.Title}</MovieTitle>}
            </MovieCard>
          );
        })}
      </CardContentHolder>
    </ContentDiv>
  );
};
export default Likes;
