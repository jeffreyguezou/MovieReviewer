import { useQuery } from "@tanstack/react-query";
import fetch from "../../API/fetch";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { LoadingP } from "./WatchList";

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

const Watched = () => {
  //const [movieID, setMovieID] = useState("");
  //const IDs = ["tt0054215", "tt0068646", "tt1392170"];

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
  const IDs = selectedUserData.movies.watched;

  return (
    <CardContentHolder>
      {IDs.map((id) => {
        const { status, error, isFetching, data } = useQuery({
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
