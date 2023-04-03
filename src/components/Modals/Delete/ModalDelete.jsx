import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteRestauration } from "../../../Feature/restaurationSlice";

import { handleClose } from "../../../Feature/modalSlice";
import { deleteReserve } from "../../../Feature/reserveSlice";
import { deleteImages } from "../../../Feature/imagesSlice";
import { deletePret } from "../../../Feature/pretSlice";
import { deleteAcquisition } from "../../../Feature/acquisitionSlice";
import { deleteExposition } from "../../../Feature/expositionSlice";

function ModalDelete({ type, id }) {
  const dispatch = useDispatch();
  const { showDelete } = useSelector((state) => state.modal);
  const { succesReserve, loading } = useSelector((state) => state.reserve);
  const { succesRestauration } = useSelector((state) => state.restauration);
  const { succesImage } = useSelector((state) => state.image);
  const { succesPret } = useSelector((state) => state.pret);
  const { succesAcquisition } = useSelector((state) => state.acquisition);
  const { succesExposition } = useSelector((state) => state.exposition);

  const handleClosee = () => dispatch(handleClose());

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === "Reserve") {
      dispatch(deleteReserve(id));
    } else if (type === "Restauration") {
      dispatch(deleteRestauration(id));
    } else if (type === "Image") {
      dispatch(deleteImages(id));
    } else if (type === "Pret") {
      dispatch(deletePret(id));
    } else if (type === "Acquisition") {
      dispatch(deleteAcquisition(id));
    } else if (type === "Exposition") {
      dispatch(deleteExposition(id));
    }
  };

  useEffect(() => {
    if (
      succesReserve === true ||
      succesRestauration === true ||
      succesImage === true ||
      succesPret === true ||
      succesAcquisition === true ||
      succesExposition === true
    ) {
      handleClosee();
    }
  }, [
    succesReserve,
    succesRestauration,
    succesImage,
    succesPret,
    succesAcquisition,
    succesExposition,
  ]);

  return (
    <Dialog open={showDelete} onClose={handleClosee}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <DialogTitle> Supprimer </DialogTitle>
        <DialogContent>
          {" "}
          <Typography variant="body1">
            Êtes vous sûr de supprimer {type}!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosee}>Cancel</Button>
          <Button type="submit">Oui</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalDelete;
