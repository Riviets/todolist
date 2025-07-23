import { createBrowserRouter } from "react-router-dom";
import TodolistPage from "../pages/TodolistPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TodolistPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
