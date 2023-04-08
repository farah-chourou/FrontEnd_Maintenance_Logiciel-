import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import TacheService from "../../services/tacheService";
import Toastfunction from "../../utils/ToastFunction";
import userService from "../../services/userService";
import { fDateInverse } from "../../utils/formatTime";

const etat = ["En Cours", "Réaliser", "A faire"];
function EditTache({ popup, handleClose, handleEditTask }) {
  const { open, value, idProject } = popup;
  const [Task, setTask] = useState({
    dateCloture: new Date(),
    etat: "",
  });

  const handleChange = (e) => {
    setTask({ ...Task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Task);
    TacheService.updateTaskEtat(value._id, Task)
      .then((response) => {
        Toastfunction.TaostSuccess("Tache modifier avec Succès.");
        handleEditTask(value._id, Task);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(idProject);
    setTask({
      dateCloture: value.dateCloture,
      etat: value.etat,
    });
  }, []);

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{"Modifier tache "}</DialogTitle>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Date de cloture"
                required
                name="dateCloture"
                type="date"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Task.dateCloture}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Affecter a "
                name="etat"
                select
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Task.etat}
                required
              >
                {etat?.map((item) => (
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

export default EditTache;
