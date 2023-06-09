import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

import projetService from "../../../services/projetService";
import Toastfunction from "../../../utils/ToastFunction";

const type = ["En Cours", "Terminer"];

function ModalEditProject({ popup, handleClose, handleEditProject }) {
  const { open, value } = popup;
  const [Project, setProject] = useState({
    nom: "",
    prenom: "",
    tel: "",
    spec: "",
    etat: "",
  });

  const handleChange = (e) => {
    setProject({ ...Project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Project);
    projetService
      .updateProject(value._id, Project)
      .then((response) => {
        console.log(response);
        Toastfunction.TaostSuccess("Projet Modifier avec Succès.");
        handleEditProject(value._id, Project);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setProject({
      nom: value.nom,
      description: value.description,
      etat: value.etat,
    });
  }, []);
  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Modifier Projet  "}</DialogTitle>

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
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Etat Projet"
                name="etat"
                select
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Project.etat}
                required
              >
                {type.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
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
            Modifier
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalEditProject;
