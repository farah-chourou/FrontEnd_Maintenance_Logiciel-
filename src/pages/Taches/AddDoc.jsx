import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import Form from "react-bootstrap/Form";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import TacheService from "../../services/tacheService";
import Toastfunction from "../../utils/ToastFunction";

function AddDoc({ popup, handleClose, handleAddDoc }) {
  const { open, value, idProject } = popup;
  const [Documentation, setDocumentation] = useState(null);

  const handleChange = (e) => {
    setDocumentation(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Documentation", Documentation);
    TacheService.addDocument(value._id, formData)
      .then((response) => {
        Toastfunction.TaostSuccess("Document ajouter  avec Succès.");
        handleAddDoc(value._id);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>{" Ajouter document au tache"}</DialogTitle>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Ajouter un document a rendre</Form.Label>
                <Form.Control
                  name="Documentation"
                  onChange={handleChange}
                  size="sm"
                  type="file"
                />
              </Form.Group>
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

export default AddDoc;
