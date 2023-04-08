import React from "react";
import { Grid, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

import Toastfunction from "../../../utils/ToastFunction";
import tacheService from "../../../services/tacheService";

// eslint-disable-next-line react/prop-types
function ModalDelete({ popup, handleClose, handleDeleteTask }) {
  const { open, valueArray, valueRow } = popup;

  const handleSubmit = (e) => {
    e.preventDefault();
    tacheService
      .deleteOne(valueRow._id)
      .then((response) => {
        handleDeleteTask(valueRow._id);
        Toastfunction.TaostSuccess("Tache supprimer avec succés");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Supprimer Tache "}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2} p={3}>
            <Typography variant="h6" fontWeight="bold">
              {" "}
              Êtes vous sûr de supprimer cette tache "{valueRow.nom}" ?
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
