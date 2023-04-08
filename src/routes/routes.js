import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/dashboard";
import SimpleLayout from "../layouts/simple";
//
import LoginPage from "../pages/Auth/LoginPage";
import ForgetPasswordPage from "../pages/Auth/ForgetPasswordPage";

import Page404 from "../pages/ErorPages/Page404";
import ProfilePage from "../pages/ProfilePage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import GestionDeveloppeur from "../pages/GestionDeveloppeur/GestionDeveloppeur";
import Application from "../pages/Application/Application";
import DetailsProject from "../pages/Application/DetailsProject";
import SuiviAvancementPage from "../pages/SuiviAvancementPage";
import HistoriquePage from "../pages/HistoriquePage";
import Taches from "../pages/Taches/Taches";
import SaisirTache from "../pages/SaisirTache/SaisirTache";

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
        { path: "application", element: <Application /> },
        { path: "application/details/:_id", element: <DetailsProject /> },

        { path: "suivi_avancement", element: <SuiviAvancementPage /> },
        { path: "gestion_developpeurs", element: <GestionDeveloppeur /> },
        { path: "base_connaissances", element: <HistoriquePage /> },

        { path: "taches", element: <Taches /> },
        { path: "saisir_tache", element: <SaisirTache /> },
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
