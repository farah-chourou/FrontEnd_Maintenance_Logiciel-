import { Helmet } from "react-helmet-async";
import { useState, useContext } from "react";

// @mui
import {
  Typography,
  Container,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
  Avatar,
  TextField,
} from "@mui/material";
import { UserContext } from "../store/Contexts";
import authService from "../services/authService";
import Toastfunction from "../utils/ToastFunction";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const [Update, setUpdate] = useState({
    mdp: "",
    oldpassword: "",
    confpassword: "",
  });
  const [errorConform, seterrorConform] = useState(false);
  const [errorIncorrect, seterrorIncorrect] = useState(false);
  const [errorValid, seterrorValid] = useState(false);

  const handleChange = (e) => {
    setUpdate({ ...Update, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    seterrorConform(false);
    seterrorIncorrect(false);
    seterrorValid(false);
    if (Update.mdp.length < 7) {
      seterrorValid(true);
    } else if (Update.mdp !== Update.confpassword) {
      seterrorConform(true);
    } else {
      authService
        .changePassword(Update)
        .then((response) => {
          Toastfunction.TaostSuccess("Mot de Passe Changé avec Succès.");
          setUpdate({ mdp: "", oldpassword: "", confpassword: "" });
        })

        .catch((error) => {
          if (error.response.data.Message === "old password is not correct") {
            seterrorIncorrect(true);
          }
          console.log(error);
        });
    }
  };

  return (
    <Container className="container">
      <Helmet>
        <title> Profile </title>
      </Helmet>

      <>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Profile
        </Typography>
      </>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Information Générale{" "}
          </Typography>
          <Typography variant="body1" sx={{ m: 2 }}>
            <b> Nom: </b> {user.nom}
          </Typography>
          <Typography variant="body1" sx={{ m: 2 }}>
            <b> Prénom: </b> {user.prenom}
          </Typography>{" "}
          <Typography variant="body1" sx={{ m: 2 }}>
            <b> Numéro Telephone: </b> {user.tel}
          </Typography>
          <Typography variant="body1" sx={{ m: 2 }}>
            <b> Role: </b> {user.spec}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Changer Mot De Passe{" "}
          </Typography>{" "}
          <Box sx={{ m: 2 }}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                sx={{ m: 1 }}
                label="Mot de passe actuel "
                required
                name="oldpassword"
                type="password"
                variant="outlined"
                size="small"
                value={Update.oldpassword}
                onChange={handleChange}
                error={errorIncorrect}
                helperText={errorIncorrect ? "Mot de passe  incorrecte  " : ""}
              />{" "}
              <br />
              <TextField
                sx={{ m: 1 }}
                label="Nouveau mot de passe  "
                required
                name="mdp"
                type="password"
                variant="outlined"
                size="small"
                value={Update.mdp}
                onChange={handleChange}
                error={errorValid}
                helperText={
                  errorValid
                    ? "Mot de passe doit être au minimum 7 caractères "
                    : ""
                }
              />
              <br />
              <TextField
                sx={{ m: 1 }}
                label="Confirmer nouveau mot de passe  "
                required
                name="confpassword"
                type="password"
                variant="outlined"
                size="small"
                value={Update.confpassword}
                onChange={handleChange}
                error={errorConform}
                helperText={errorConform ? " Mot de passe non  conforme " : ""}
              />{" "}
              <br />
              <Button autoFocus variant="contained" type="submit" sx={{ m: 1 }}>
                Enregistrer
              </Button>{" "}
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
