import React from "react";
import { Grid, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

import userService from "../../../services/userService";
import Toastfunction from "../../../utils/ToastFunction";

// eslint-disable-next-line react/prop-types
function ModalDelete({ popup, handleClose, handleDeleteDeveloper }) {
  const { open, valueArray, valueRow } = popup;

  const handleSubmit = (e) => {
    e.preventDefault();
    userService
      .deleteOne(valueRow._id)
      .then((response) => {
        console.log(valueRow._id);
        handleDeleteDeveloper(valueRow._id);
        Toastfunction.TaostSuccess("Développeur supprimer avec succés");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Supprimer développeur "}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2} p={3}>
            <Typography variant="h6" fontWeight="bold">
              {" "}
              Êtes vous sûr de supprimer le développeur {valueRow.nom}{" "}
              {valueRow.prenom} ?{" "}
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button autoFocus variant="contained" type="submit">
            Supprimer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalDelete;
