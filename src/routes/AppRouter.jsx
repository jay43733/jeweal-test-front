import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ActionPage from "../page/ActionPage";

const tableRouter = createBrowserRouter([
  {
    path: "/",
    element: <ActionPage />,
  },
  {
    path: "/:id",
    element: <ActionPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={tableRouter} />;
};

export default AppRouter;
