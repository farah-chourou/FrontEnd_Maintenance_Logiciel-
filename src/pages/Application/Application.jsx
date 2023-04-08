import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// @mui
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
import VisibilityIcon from "@mui/icons-material/Visibility";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import projetService from "../../services/projetService";
import Avatar from "../../components/Avatar/Avatar";
import ModalAddProject from "./Modals/ModalAddProject";
import ModalDelete from "./Modals/ModalDelete";
import ModalEditProject from "./Modals/ModalEditProject";

function Application() {
  const navigate = useNavigate();
  const [Projects, setProjects] = useState([]);
  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: Projects,
  });
  const openAdd = () => {
    setPopup({ open: true, type: "add", value: Projects });
  };

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row });
  };

  const openDelete = (row) => {
    setPopup({
      open: true,
      type: "delete",
      valueRow: row,
      valueArray: Projects,
    });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: Projects });
  };

  const handleDeleteProject = (_id) => {
    console.log(_id);
    const filteredProjects = Projects.filter((a) => a._id !== _id);
    setProjects(filteredProjects);
  };
  const handleEditProject = (_id, row) => {
    const index = Projects.findIndex((item) => item._id === _id);
    if (index !== -1) {
      Projects[index] = { ...Projects[index], ...row };
    }
  };
  useEffect(() => {
    projetService
      .getAll()
      .then((response) => {
        console.log(response);
        setProjects(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleNavigateDetail = (_id) => {
    console.log(_id);
    navigate(`/app/application/details/${_id}`);
  };

  return (
    <Container className="container">
      <Helmet>
        <title> Gestion Projets </title>
      </Helmet>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Liste des Projets
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => openAdd()}
        >
          Nouveau Projet
        </Button>
      </Stack>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow hover>
              <TableCell>
                <b> #</b>
              </TableCell>
              <TableCell>
                <b>Titre </b>
              </TableCell>

              <TableCell>
                <b> Description</b>
              </TableCell>
              <TableCell>
                <b> Etat</b>
              </TableCell>
              <TableCell>
                {" "}
                <b> Autre </b>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Projects.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell>
                  <Avatar name={`${item.nom} ${item.prenom} `} />
                </TableCell>
                <TableCell>{item.nom}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.etat}</TableCell>

                <TableCell>
                  <IconButton onClick={() => openDelete(item)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => openUpdate(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleNavigateDetail(item._id)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>{" "}
        </Table>
      </TableContainer>

      {popup.type === "add" && (
        <ModalAddProject popup={popup} handleClose={handleClose} />
      )}

      {popup.type === "delete" && (
        <ModalDelete
          popup={popup}
          handleDeleteProject={handleDeleteProject}
          handleClose={handleClose}
        />
      )}
      {popup.type === "update" && (
        <ModalEditProject
          popup={popup}
          handleClose={handleClose}
          handleEditProject={handleEditProject}
        />
      )}
    </Container>
  );
}

export default Application;
