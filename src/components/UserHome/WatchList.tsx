import styled from "styled-components";
import { MoviePoster, MovieTitle, MovieCard } from "./Watched";
import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import { useSelector } from "react-redux";
import { AppInterface, AuthState } from "../../util/interfaces";

const Border = styled.div`
  height: 10px;
  border-bottom: 1px solid #445566;
`;
export const CardContentHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
`;
export const ContentDiv = styled.div`
  margin: 0 10%;
  padding-top: 1rem;
`;
const WatchListText = styled.span`
  color: #9ab;
  font-size: 1rem;
  font-weight: 400;
`;
export const LoadingP = styled.p`
  text-align: center;
  color: #def;
`;

//const IDs = ["tt0054215", "tt0068646", "tt1392170"];

const WatchList = () => {
  const appData = useSelector((state: AppInterface) => state.app);
  const { userName } = useSelector((state: AuthState) => state.auth);

  let userIndex;

  appData.users.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });

  const selectedUserData = appData.users[userIndex];

  const IDs = selectedUserData.movies.watchlist;
  return (
    <ContentDiv>
      <WatchListText>
        You want to watch {Object.keys(IDs).length} movies
      </WatchListText>
      <Border></Border>
      <CardContentHolder>
        {Object.keys(IDs).map((id) => {
          const { isFetching, data } = useQuery({
            queryKey: ["movie", id],
            queryFn: () => {
              return fetch(`http://www.omdbapi.com/?i=${id}&apikey=3f046e12`);
            },
            staleTime: 5000,
          });
          if (isFetching) {
            return <LoadingP key={id}>Fetching...</LoadingP>;
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
export default WatchList;
