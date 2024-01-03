import { createSlice } from "@reduxjs/toolkit";
import { userArray, userInterface } from "../util/interfaces";

const initialState = {
  users: [
    {
      userName: "Jeffrey",
      password: "123",
      email: "jeffrey@mail.com",
      movies: {
        watched: [],
        liked: [],
        watchlist: [],
      },
      reviews: [
        {
          imdbID: "tt15654328",
          review: "Wonderful",
          rating: 4,
        },
      ],
    },
  ],
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    addLikes: (state, action) => {
      let userIndex;
      let datad = state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
          console.log(userIndex);
        }
      });
      state.users[userIndex].movies.liked.push(action.payload.movieID);
    },
    addWatched: (state, action) => {
      let userIndex: number;
      let datad = state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      state.users[userIndex].movies.watched.push(action.payload.movieID);
    },
    addWatchlist: (state, action) => {
      let userIndex;
      state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      state.users[userIndex].movies.watchlist.push(action.payload.movieID);
    },
    addUserReview: (state, action) => {
      let userIndex;
      state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      state.users[userIndex].reviews.push(action.payload.reviewDetails);
    },
  },
});
export default AppSlice.reducer;
export const AppSliceActions = AppSlice.actions;
