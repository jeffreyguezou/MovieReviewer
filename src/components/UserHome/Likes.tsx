import styled from "styled-components";
import { MoviePoster, MovieTitle, MovieCard } from "./Watched";
import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import { ContentDiv, CardContentHolder } from "./WatchList";
import { useSelector } from "react-redux";

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
  const IDs = selectedUserData.movies.liked;
  return (
    <ContentDiv>
      <WatchListText>You liked {IDs.length} movies</WatchListText>
      <Border></Border>
      <CardContentHolder>
        {IDs.map((id) => {
          const { status, error, data } = useQuery({
            queryKey: ["movie", id],
            queryFn: () => {
              return fetch(`http://www.omdbapi.com/?i=${id}&apikey=3f046e12`);
            },
          });

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
