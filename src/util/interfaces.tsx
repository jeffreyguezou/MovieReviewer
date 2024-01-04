interface movies {
  watched: {};
  liked: {};
  watchlist: {};
}
export interface review {
  imdbID: string;
  review: string;
  rating: number;
}
export interface userInterface {
  userName: string;
  password: string;
  email: string;
  movies: movies;
  reviews: review[];
}
export interface AppInterface {
  app: {
    users: userInterface[];
  };
}
export interface userArray {
  users: userInterface[];
}
export interface AuthState {
  auth: {
    isLoggedIn: boolean;
    userName: string;
  };
}
