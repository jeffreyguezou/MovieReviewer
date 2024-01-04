import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import SignUpPage from "./pages/SignUppage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignInpage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./RootLayout";
import UserRoot from "./UserRoot";
import WatchListPage from "./pages/WatchListPage";
import LikesPage from "./pages/LikesPage";
import WatchedPage from "./pages/Watched";
import ReviewsPage from "./pages/ReviewsPage";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,

      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        {
          path: "/home",
          element: <UserRoot />,
          errorElement: <LandingPage />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
            {
              path: "watchlist",
              element: <WatchListPage />,
            },
            {
              path: "likes",
              element: <LikesPage />,
            },
            {
              path: "reviews",
              element: <ReviewsPage />,
            },
            {
              path: "watched",
              element: <WatchedPage />,
            },
          ],
        },
      ],
    },

    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/signin",
      element: <SignInpage />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
