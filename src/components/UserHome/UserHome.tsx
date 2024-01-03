import { ContentDiv } from "./WatchList";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import fetch from "../../API/fetch";
import MovieCard from "./MovieCard";

export const BodyDiv = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBox = styled.input`
  background-color: #2c3440;
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #456;
  box-sizing: border-box;
  color: #89a;
  font-size: 1.07692308rem;
  line-height: 1;
  margin: 0;
  padding: 9px 9px 8px;
`;
const SearchSection = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const FindLabel = styled.label`
  color: #9ab;
  font-size: 1rem;
  font-weight: 400;
`;

const UserHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { status, error, data } = useQuery({
    queryKey: ["movie", searchTerm],
    queryFn: () =>
      fetch(`http://www.omdbapi.com/?t=${searchTerm}&apikey=3f046e12`),
    enabled: enabled,
  });

  if (status === "error") return <p>Error {error.message}</p>;

  console.log({ data, status, error });

  const searchTermChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.currentTarget.value);
    setEnabled(false);
  };

  const searchHandler = () => {
    setEnabled(true);
  };
  return (
    <ContentDiv>
      <SearchSection>
        <FindLabel>FIND A FILM</FindLabel>
        <SearchBox onChange={searchTermChangeHandler} type="text"></SearchBox>
        <button onClick={searchHandler}>Search</button>
      </SearchSection>
      {data && <MovieCard data={data} />}
    </ContentDiv>
  );
};
export default UserHome;
