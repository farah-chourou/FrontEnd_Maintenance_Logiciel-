import React from "react";
import { Grid, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

import projetService from "../../../services/projetService";
import Toastfunction from "../../../utils/ToastFunction";

// eslint-disable-next-line react/prop-types
function ModalDelete({ popup, handleClose, handleDeleteProject }) {
  const { open, valueArray, valueRow } = popup;

  const handleSubmit = (e) => {
    e.preventDefault();
    projetService
      .deleteOne(valueRow._id)
      .then((response) => {
        console.log(valueRow._id);
        handleDeleteProject(valueRow._id);
        Toastfunction.TaostSuccess("Projet supprimer avec succés");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Supprimer Projet "}</DialogTitle>

      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2} p={3}>
            <Typography variant="h6" fontWeight="bold">
              {" "}
              Êtes vous sûr de supprimer le projet {valueRow.nom} ?
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
