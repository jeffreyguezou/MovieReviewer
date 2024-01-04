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
      let userIndex;
      state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      if (userIndex) {
        let movieID = action.payload.movieID;

        let updatedLikes = {
          ...state.users[userIndex].movies.liked,
          [movieID]: { isLiked: true },
        };
        state.users[userIndex].movies.liked = updatedLikes;
      }
    },
    removeLike: (state, action) => {
      let userIndex;
      state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      let movieID = action.payload.movieID;
      if (userIndex) {
        delete state.users[userIndex].movies.liked[movieID];
      }
    },
    addWatched: (state, action) => {
      let userIndex;
      state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      if (userIndex) {
        let movieID = action.payload.movieID;
        let updatedWatched = {
          ...state.users[userIndex].movies.watched,
          [movieID]: { isWatched: true },
        };
        state.users[userIndex].movies.watched = updatedWatched;
      }
    },
    removeWatched: (state, action) => {
      let userIndex;
      state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      let movieID = action.payload.movieID;

      delete state.users[userIndex].movies.watched[movieID];
    },

    addWatchlist: (state, action) => {
      let userIndex;
      state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      if (userIndex) {
        let movieID = action.payload.movieID;
        let updatedWatchList = {
          ...state.users[userIndex].movies.watchlist,
          [movieID]: { isWatchListed: true },
        };
        state.users[userIndex].movies.watchlist = updatedWatchList;
      }
    },

    removeWatchlist: (state, action) => {
      let userIndex;
      state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      let movieID = action.payload.movieID;
      delete state.users[userIndex].movies.watched[movieID];
    },

    addUserReview: (state, action) => {
      let userIndex;
      state.users.map((user, index) => {
        if (user.userName === action.payload.userName) {
          userIndex = index;
        }
      });
      if (userIndex) {
        state.users[userIndex].reviews.push(action.payload.reviewDetails);
      }
    },
  },
});
export default AppSlice.reducer;
export const AppSliceActions = AppSlice.actions;
