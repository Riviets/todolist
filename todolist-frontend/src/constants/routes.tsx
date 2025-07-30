import { createBrowserRouter } from "react-router-dom";
import TodolistPage from "../pages/TodolistPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/utils/ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <TodolistPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
