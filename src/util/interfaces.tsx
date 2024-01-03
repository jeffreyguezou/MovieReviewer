interface movies {
  watched: string[];
  liked: string[];
  watchlist: string[];
}
interface review {
  imdbID: string;
  review: string;
  rating: number;
}
interface userInterface {
  users: {
    userName: string;
    password: string;
    email: string;
    movies: movies;
    reviews: review[];
  };
}
export interface userArray {
  users: userInterface[];
}
