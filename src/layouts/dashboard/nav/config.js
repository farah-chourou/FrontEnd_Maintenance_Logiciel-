import Person2Icon from "@mui/icons-material/Person2";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ExposureIcon from "@mui/icons-material/Exposure";
import GroupIcon from "@mui/icons-material/Group";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BorderColorIcon from "@mui/icons-material/BorderColor"; // component
import DashboardIcon from "@mui/icons-material/Dashboard";
import SvgColor from "../../../components/svg-color";
import { roles } from "../../../custom/roles";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Dashboard",
    path: "/app/dashboard",
    icon: <DashboardIcon />,
    role: roles.ALL,
  },

  {
    title: "Profile",
    path: "/app/profile",
    icon: <Person2Icon />,
    role: roles.ALL,
  },

  {
    title: "Application ",
    path: "/app/application",
    icon: icon("ic_user"),
    role: roles.ADMIN,
  },

  {
    title: "Suivi Avancement",
    path: "/app/suivi_avancement",
    icon: <EventAvailableIcon />,
    role: roles.ADMIN,
  },
  {
    title: "Gestion Des Développeurs",
    path: "/app/gestion_developpeurs",
    icon: <GroupIcon />,
    role: roles.ADMIN,
  },
  {
    title: "Taches",
    path: "/app/taches",
    icon: <AssignmentIcon />,
    role: roles.DEVELOPER,
  },
  {
    title: "Saisir Tache",
    path: "/app/saisir_tache",
    icon: <BorderColorIcon />,
    role: roles.DEVELOPER,
  },
  {
    title: "Base de connaissances",
    path: "/app/base_connaissances",
    icon: <ManageHistoryIcon />,
    role: roles.ALL,
  },
];

export default navConfig;
