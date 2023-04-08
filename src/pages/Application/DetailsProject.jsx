import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  Typography,
  Container,
  Stack,
  Button,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
} from "@mui/material";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import projetService from "../../services/projetService";
import Avatar from "../../components/Avatar/Avatar";
import tacheService from "../../services/tacheService";
import { fDate } from "../../utils/formatTime";
import ModalDelete from "./ModalsTask/ModalDelete";
import ModalAddTask from "./ModalsTask/ModalAddTask";
import ModalEditTask from "./ModalsTask/ModalEditTask";

function DetailsProject() {
  const { _id } = useParams();
  const [Projet, setProjet] = useState();
  const [Tasks, setTasks] = useState([]);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: Tasks,
  });
  const getProject = () => {
    projetService
      .getOne(_id)
      .then((response) => {
        console.log(response);
        setProjet(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTasks = () => {
    tacheService
      .getAllTaskByProjectId(_id)
      .then((response) => {
        console.log(response);
        setTasks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openAdd = () => {
    setPopup({ open: true, type: "add", value: Tasks, idProject: _id });
  };

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row, idProject: _id });
  };

  const openDelete = (row) => {
    setPopup({
      open: true,
      type: "delete",
      valueRow: row,
      valueArray: Tasks,
    });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: Tasks });
  };

  const handleDeleteTask = (_id) => {
    console.log(_id);
    const filteredProjects = Tasks.filter((a) => a._id !== _id);
    setTasks(filteredProjects);
  };
  const handleEditTask = (_id, row) => {
    const index = Tasks.findIndex((item) => item._id === _id);
    if (index !== -1) {
      Tasks[index] = { ...Tasks[index], ...row };
    }
  };
  useEffect(() => {
    getProject();
    getTasks();
  }, []);
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Container className="container">
      <Breadcrumbs separator="›" aria-label="breadcrumb" mb={2}>
        <Link underline="hover" key="1" color="inherit" to="/app/application">
          Gestion Des Projets
        </Link>
        ,
        <Typography key="3" color="text.primary">
          Détail Projet
        </Typography>
      </Breadcrumbs>{" "}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h5" sx={{ color: "#273B84" }}>
          {" "}
          Nom Projet: {Projet?.nom}{" "}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => openAdd()}
        >
          Ajouter Tache
        </Button>
      </Stack>{" "}
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow hover>
              <TableCell padding="none">
                <b> #</b>
              </TableCell>
              <TableCell padding="none">
                <b>Nom </b>
              </TableCell>
              <TableCell padding="none">
                <b> Type</b>
              </TableCell>
              <TableCell padding="none">
                <b> Date d'affectation</b>
              </TableCell>
              <TableCell padding="none">
                <b> Date de cloture</b>
              </TableCell>

              <TableCell padding="none">
                <b> Etat</b>
              </TableCell>
              <TableCell padding="none">
                <b> Developpeur</b>
              </TableCell>
              <TableCell padding="none">
                <b> Document</b>
              </TableCell>
              <TableCell>
                {" "}
                <b> Autre </b>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Tasks.map((item) => (
              <TableRow key={item._id} hover>
                {console.log(item)}
                <TableCell padding="none">
                  <Avatar name={`${item.nom} ${item.prenom} `} />
                </TableCell>
                <TableCell padding="none">{item.nom}</TableCell>
                <TableCell padding="none">{item.type}</TableCell>
                <TableCell padding="none">
                  {fDate(item.dateAffectation)}
                </TableCell>
                <TableCell padding="none">{fDate(item.dateCloture)}</TableCell>
                <TableCell padding="none">
                  {" "}
                  {item.etat === "En Cours" ? (
                    <span className="etatEnCours"> {item.etat} </span>
                  ) : item.etat === "Réaliser" ? (
                    <span className="etatRealiser"> {item.etat} </span>
                  ) : item.etat === "Affecter" ? (
                    <span className="etatAffecter"> {item.etat} </span>
                  ) : item.etat === "A faire" ? (
                    <span className="etatAFaire"> {item.etat} </span>
                  ) : (
                    <span className=""> {item.etat} </span>
                  )}
                </TableCell>
                <TableCell padding="none">{item.idDeveloper?.nom}</TableCell>
                <TableCell>
                  {item.documentation ? (
                    <IconButton aria-label="delete">
                      <a
                        href={item.documentation.contenu}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <InsertDriveFileIcon />
                      </a>
                    </IconButton>
                  ) : (
                    <span className="neant">Néant </span>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => openDelete(item)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => openUpdate(item)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>{" "}
        </Table>
      </TableContainer>
      {popup.type === "add" && (
        <ModalAddTask popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "delete" && (
        <ModalDelete
          popup={popup}
          handleDeleteTask={handleDeleteTask}
          handleClose={handleClose}
        />
      )}
      {popup.type === "update" && (
        <ModalEditTask
          popup={popup}
          handleClose={handleClose}
          handleEditTask={handleEditTask}
        />
      )}
    </Container>
  );
}

export default DetailsProject;
