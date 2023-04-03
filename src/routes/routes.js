import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/dashboard";
import SimpleLayout from "../layouts/simple";
//
import LoginPage from "../pages/Auth/LoginPage";
import ForgetPasswordPage from "../pages/Auth/ForgetPasswordPage";

import Page404 from "../pages/ErorPages/Page404";
import ProfilePage from "../pages/ProfilePage";
import DashboardPage from "../pages/DashboardPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    { element: <Navigate to="/login" />, index: true },

    {
      path: "/app",
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        { path: "profile", element: <ProfilePage /> },
        { path: "application", element: <ProfilePage /> },
        { path: "suivi_avancement", element: <ProfilePage /> },
        { path: "gestion_developpeurs", element: <ProfilePage /> },
        { path: "base_connaissances", element: <ProfilePage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "login/oublierMdp",
      element: <ForgetPasswordPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
