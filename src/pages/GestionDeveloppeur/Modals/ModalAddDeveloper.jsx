import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

import userService from "../../../services/userService";
import Toastfunction from "../../../utils/ToastFunction";

function ModalAddDeveloper({ popup, handleClose }) {
  const { open, value } = popup;
  const [Developer, setDeveloper] = useState({
    mail: "",
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
    console.log(Developer);
    userService
      .addDeveloper(Developer)
      .then((response) => {
        Toastfunction.TaostSuccess("Dévloppeur Ajouter avec Succès.");
        value.push(response.data.data);
        handleClose();
      })
      .catch((error) => {
        if (
          error.response.data.Message === "user already exists with that email"
        ) {
          setErrorEmail(true);
        }
        console.log(error);
      });
  };
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
                type="email"
                label="Email"
                name="mail"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Developer.mail}
                error={ErrorEmail}
                helperText={ErrorEmail ? "Email déja existe" : ""}
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
            Ajouter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalAddDeveloper;
