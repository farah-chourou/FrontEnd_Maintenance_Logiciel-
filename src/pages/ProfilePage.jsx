import { Helmet } from "react-helmet-async";
import { useState } from "react";
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
} from "@mui/material";

export default function ProfilePage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Helmet>
        <title> Profile </title>
      </Helmet>

      <>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Profile
        </Typography>
      </>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <Grid
            container
            spacing={1}
            direction="column"
            className="border border-secondary rounded shadow-lg m-1"
          >
            <Grid
              className="pt-4"
              item
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "grey",
              }}
            >
              <Avatar
                src="/path/to/image.jpg"
                alt="User Avatar"
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              />
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">Nom d'utilisateur</Typography>
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1">Rôle de l'utilisateur</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={7}>
          {/* Colonne de droite : informations spécifiques */}
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h6">Informations spécifiques</Typography>
            </Grid>
            <Grid item>
              {/* Ajoutez ici vos champs de saisie et/ou vos composants pour afficher les informations spécifiques */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
