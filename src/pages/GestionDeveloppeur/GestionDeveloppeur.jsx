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

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import userService from "../../services/userService";
import Avatar from "../../components/Avatar/Avatar";
import ModalAddDeveloper from "./Modals/ModalAddDeveloper";
import ModalDelete from "./Modals/ModalDelete";
import ModalEditDeveloper from "./Modals/ModalEditDeveloper";

function GestionDeveloppeur() {
  const [Developers, setDevelopers] = useState([]);
  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: Developers,
  });
  const openAdd = () => {
    setPopup({ open: true, type: "add", value: Developers });
  };

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row });
  };

  const openShow = (row) => {
    setPopup({ open: true, type: "show", value: row });
  };

  const openDelete = (row) => {
    setPopup({
      open: true,
      type: "delete",
      valueRow: row,
      valueArray: Developers,
    });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: Developers });
  };

  const handleDeleteDeveloper = (_id) => {
    console.log(_id);
    const filteredDevelopers = Developers.filter((a) => a._id !== _id);
    setDevelopers(filteredDevelopers);
  };
  const handleEditDeveloper = (_id, row) => {
    const index = Developers.findIndex((item) => item._id === _id);
    if (index !== -1) {
      Developers[index] = { ...Developers[index], ...row };
    }
  };
  useEffect(() => {
    userService
      .getAll()
      .then((response) => {
        console.log(response);
        setDevelopers(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container className="container">
      <Helmet>
        <title> Gestion Dévéloppeurs </title>
      </Helmet>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Liste des développeurs
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => openAdd()}
        >
          Nouveau Développeur
        </Button>
      </Stack>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow hover>
              <TableCell>
                <b> #</b>
              </TableCell>
              <TableCell padding="none">
                <b>Nom </b>
              </TableCell>

              <TableCell>
                <b> Prénom</b>
              </TableCell>
              <TableCell padding="none">
                <b>Email </b>
              </TableCell>
              <TableCell>
                {" "}
                <b> N° Téléphone</b>{" "}
              </TableCell>
              <TableCell padding="none">
                {" "}
                <b> Spécialité </b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b> Autre </b>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Developers.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Avatar name={`${item.nom} ${item.prenom} `} />
                </TableCell>
                <TableCell padding="none">{item.nom}</TableCell>
                <TableCell>{item.prenom}</TableCell>
                <TableCell padding="none">{item.mail}</TableCell>{" "}
                <TableCell>{item.tel}</TableCell>
                <TableCell padding="none">{item.spec}</TableCell>
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
        <ModalAddDeveloper popup={popup} handleClose={handleClose} />
      )}

      {popup.type === "delete" && (
        <ModalDelete
          popup={popup}
          handleDeleteDeveloper={handleDeleteDeveloper}
          handleClose={handleClose}
        />
      )}
      {popup.type === "update" && (
        <ModalEditDeveloper
          popup={popup}
          handleClose={handleClose}
          handleEditDeveloper={handleEditDeveloper}
        />
      )}
    </Container>
  );
}

export default GestionDeveloppeur;
