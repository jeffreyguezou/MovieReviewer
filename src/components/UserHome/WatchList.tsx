import styled from "styled-components";
import { MoviePoster, MovieTitle, MovieCard } from "./Watched";
import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import { useSelector } from "react-redux";

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
  const appData = useSelector((state) => state.app);
  const { userName } = useSelector((state) => state.auth);

  let userIndex;
  console.log(appData.users);

  let selectedUser = appData.users.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });

  let selectedUserData = appData.users[userIndex];
  console.log(selectedUserData);
  const IDs = selectedUserData.movies.watchlist;
  return (
    <ContentDiv>
      <WatchListText>You want to watch {IDs.length} movies</WatchListText>
      <Border></Border>
      <CardContentHolder>
        {IDs.map((id) => {
          const { status, isFetching, error, data } = useQuery({
            queryKey: ["movie", id],
            queryFn: () => {
              return fetch(`http://www.omdbapi.com/?i=${id}&apikey=3f046e12`);
            },
          });
          if (isFetching) {
            return <LoadingP>Fetching...</LoadingP>;
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
