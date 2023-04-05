import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

import userService from "../../../services/userService";
import Toastfunction from "../../../utils/ToastFunction";

function ModalEditDeveloper({ popup, handleClose, handleEditDeveloper }) {
  const { open, value } = popup;
  const [Developer, setDeveloper] = useState({
    nom: "",
    prenom: "",
    tel: "",
    spec: "",
  });

  const [ErrorEmail, setErrorEmail] = useState(false);

  const handleChange = (e) => {
    setDeveloper({ ...Developer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userService
      .updateDeveloper(value._id, Developer)
      .then((response) => {
        Toastfunction.TaostSuccess("Dévloppeur Modifier avec Succès.");
        handleEditDeveloper(value._id, Developer);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setDeveloper({
      nom: value.nom,
      prenom: value.prenom,
      tel: value.tel,
      spec: value.spec,
    });
  }, []);
  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Ajouter un nouveau développeur "}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom"
                required
                name="nom"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Developer.nom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="prenom"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Developer.prenom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="N° Téléphone"
                name="tel"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Developer.tel}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                label="Spécialité"
                name="spec"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Developer.spec}
              />
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

export default ModalEditDeveloper;
