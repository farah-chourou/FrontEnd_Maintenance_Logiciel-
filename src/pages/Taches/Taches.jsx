import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

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
import EditIcon from "@mui/icons-material/Edit";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { Buffer } from "buffer";
import { saveAs } from "file-saver";

import TaskService from "../../services/tacheService";
import Avatar from "../../components/Avatar/Avatar";
import { fDate } from "../../utils/formatTime";
import EditTache from "./EditTache";
import AddDoc from "./AddDoc";

function Taches() {
  const [Tasks, setTasks] = useState([]);
  useEffect(() => {
    TaskService.getAllByDeveloperId()
      .then((response) => {
        console.log(response);
        setTasks(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: Tasks,
  });

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row });
  };
  const openAddDoc = (row) => {
    setPopup({ open: true, type: "addDoc", value: row });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: Tasks });
  };
  const handleAddDoc = (_id, row) => {
    const index = Tasks.findIndex((item) => item._id === _id);
    if (index !== -1) {
      Tasks[index] = { ...Tasks[index], ...row };
    }
  };
  const handleEditTask = (_id, row) => {
    const index = Tasks.findIndex((item) => item._id === _id);
    if (index !== -1) {
      Tasks[index] = { ...Tasks[index], ...row };
    }
  };
  const handleDownload = (file) => {
    console.log(file);
    // Create a new buffer from the buffer data
    console.log(file.contenu);
    const blob = new Blob([file.contenu], {
      type: "application/octet-stream",
    });

    // Download the file using the saveAs function
    saveAs(blob, file.nom);
  };
  return (
    <Container className="container">
      <Helmet>
        <title>Liste Des Taches</title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Liste Des Taches Affecter
        </Typography>
      </Stack>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow hover>
              <TableCell>
                <b> #</b>
              </TableCell>
              <TableCell padding="none">
                <b>Titre </b>
              </TableCell>

              <TableCell>
                <b> Type</b>
              </TableCell>
              <TableCell padding="none">
                <b>Date d'affectation </b>
              </TableCell>
              <TableCell>
                {" "}
                <b> Date de Cloture</b>{" "}
              </TableCell>
              <TableCell padding="none">
                {" "}
                <b> Etat </b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b> Projet </b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b> Développeur </b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b> Documentation </b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b> Modifier </b>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Tasks?.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Avatar name={`${item.nom} ${item.prenom} `} />
                </TableCell>
                <TableCell padding="none">{item.nom}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell padding="none">
                  {item.dateAffectation ? (
                    fDate(item.dateAffectation)
                  ) : (
                    <span className="neant">Néant </span>
                  )}
                </TableCell>{" "}
                <TableCell>
                  {item.dateCloture ? (
                    fDate(item.dateCloture)
                  ) : (
                    <span className="neant">Néant </span>
                  )}
                </TableCell>{" "}
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
                <TableCell>{item.idProjet.nom}</TableCell>
                <TableCell>{item.idDeveloper.nom}</TableCell>
                <TableCell>
                  {item.documentation?.contenu ? (
                    <a
                      href={item.documentation.contenu}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="neant">Néant </span>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => openUpdate(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openAddDoc(item)}>
                    <FilePresentIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>{" "}
        </Table>
      </TableContainer>
      {popup.type === "update" && (
        <EditTache
          popup={popup}
          handleClose={handleClose}
          handleEditTask={handleEditTask}
        />
      )}
      {popup.type === "addDoc" && (
        <AddDoc
          popup={popup}
          handleClose={handleClose}
          handleAddDoc={handleAddDoc}
        />
      )}
    </Container>
  );
}

export default Taches;
