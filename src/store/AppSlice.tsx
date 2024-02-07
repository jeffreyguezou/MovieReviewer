import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      userName: "Jeffrey",
      password: "123",
      email: "jeffrey@mail.com",
      movies: {
        watched: {},
        liked: {},
        watchlist: {},
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
      let movieID = action.payload.movieID;
      let updatedLikes = {
        ...state.users[action.payload.uIndex].movies.liked,
        [movieID]: { isLiked: true },
      };
      state.users[action.payload.uIndex].movies.liked = updatedLikes;
    },
    removeLike: (state, action) => {
      let movieID = action.payload.movieID;
      delete state.users[action.payload.uIndex].movies.liked[movieID];
    },
    addWatched: (state, action) => {
      let movieID = action.payload.movieID;
      let updatedWatched = {
        ...state.users[action.payload.uIndex].movies.watched,
        [movieID]: { isWatched: true },
      };
      state.users[action.payload.uIndex].movies.watched = updatedWatched;
    },
    removeWatched: (state, action) => {
      let movieID = action.payload.movieID;
      delete state.users[action.payload.uIndex].movies.watched[movieID];
    },

    addWatchlist: (state, action) => {
      let movieID = action.payload.movieID;
      let updatedWatchList = {
        ...state.users[action.payload.uIndex].movies.watchlist,
        [movieID]: { isWatchListed: true },
      };
      state.users[action.payload.uIndex].movies.watchlist = updatedWatchList;
    },

    removeWatchlist: (state, action) => {
      let movieID = action.payload.movieID;
      delete state.users[action.payload.uIndex].movies.watched[movieID];
    },

    addUserReview: (state, action) => {
      state.users[action.payload.uIndex].reviews.push(
        action.payload.reviewDetails
      );
    },
    replaceUserReview: (state, action) => {
      state.users[action.payload.uIndex].reviews =
        action.payload.allUserReviews;
    },
  },
});
export default AppSlice.reducer;
export const AppSliceActions = AppSlice.actions;
