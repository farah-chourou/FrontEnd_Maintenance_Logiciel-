import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

import projetService from "../../../services/projetService";
import Toastfunction from "../../../utils/ToastFunction";

function ModalAddProject({ popup, handleClose }) {
  const { open, value } = popup;
  const [Project, setProject] = useState({
    nom: "",
    description: "",
  });

  const [Error, setError] = useState(false);

  const handleChange = (e) => {
    setProject({ ...Project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Project);
    setError(false);
    projetService
      .addProject(Project)
      .then((response) => {
        Toastfunction.TaostSuccess("Projet Ajouter avec Succès.");
        value.push(response.data.data);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Ajouter un nouveau projet "}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Titre de Projet"
                required
                name="nom"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Project.nom}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="email"
                label="Description du projet"
                name="description"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Project.description}
                multiline
                rows={4}
              />
            </Grid>{" "}
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

export default ModalAddProject;
