import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { LoadingP } from "./WatchList";
import { AppInterface, AuthState } from "../../util/interfaces";
import useGetUserIndex from "../../hooks/useGetUserIndex";

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

const Watched: React.FC = () => {
  const appData = useSelector((state: AppInterface) => state.app);
  const { userName } = useSelector((state: AuthState) => state.auth);

  let userIndex = useGetUserIndex({ uName: userName });

  if (userIndex) {
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
    );
  }
};
export default Watched;
