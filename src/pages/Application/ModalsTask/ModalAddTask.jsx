import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

import TacheService from "../../../services/tacheService";
import Toastfunction from "../../../utils/ToastFunction";
import userService from "../../../services/userService";

const type = ["Script SQL", "Mise à jour", "Suppression", "Preparation"];
function ModalAddTask({ popup, handleClose }) {
  const { open, value, idProject } = popup;
  const [Task, setTask] = useState({
    nom: "",
    type: "",
    dateAffectation: new Date(),
    dateCloture: "",
    idDeveloper: "",
  });

  const [Error, setError] = useState(false);
  const [Developers, setDevelopers] = useState([]);

  const handleChange = (e) => {
    setTask({ ...Task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Task);
    TacheService.addTask(Task, idProject)
      .then((response) => {
        Toastfunction.TaostSuccess("Tache Ajouter avec Succès.");
        value.push(response.data.data);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
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
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Ajouter un nouveau tache "}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Titre du Tache"
                required
                name="nom"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Task.nom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Type de tache"
                name="type"
                select
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Task.type}
                required
              >
                {type.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date d'affecation"
                required
                name="dateAffectation"
                type="date"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Task.dateAffectation}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Affecter a "
                name="idDeveloper"
                select
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Task.idDeveloper}
                required
              >
                {Developers?.map((item) => (
                  <MenuItem value={item._id}>{item.nom}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button autoFocus variant="contained" type="submit">
            Ajouter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalAddTask;
