import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { LoadingP } from "./WatchList";
import { useNavigate } from "react-router";
import { AppInterface, AuthState } from "../../util/interfaces";

export const MoviePoster = styled.img`
  width: 100px;
  height: 150px;
`;

const CardContentHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem 15%;
`;

export const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 4px;
`;
export const MovieTitle = styled.label`
  font-size: 0.75rem;
  font-weight: bold;
  color: #def;
`;
export const NoMovieMsg = styled.p`
  text-align: center;
  color: #def;
  font-size: 2rem;
`;

const Watched = () => {
  const appData = useSelector((state: AppInterface) => state.app);
  const { userName } = useSelector((state: AuthState) => state.auth);

  let userIndex;

  console.log(appData.users);

  appData.users.map((user, index) => {
    if (user.userName === userName) {
      userIndex = index;
    }
  });

  const selectedUserData = appData.users[userIndex];

  const IDs = selectedUserData.movies.watched;
  if (Object.keys(IDs).length === 0) {
    return <NoMovieMsg>No movies watched yet!</NoMovieMsg>;
  }

  return (
    <CardContentHolder>
      {Object.keys(IDs).map((id) => {
        const { isFetching, data } = useQuery({
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
  );
};
export default Watched;
