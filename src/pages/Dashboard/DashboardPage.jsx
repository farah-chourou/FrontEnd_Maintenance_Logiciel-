import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
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
import { styled } from "@mui/material/styles";
import tacheService from "../../services/tacheService";
import projetService from "../../services/projetService";

const ShadowPaper = styled(Paper)({
  boxShadow:
    "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
  padding: "16px",
  textAlign: "center",
  fontWeight: "bold",
});

export default function DashboardPage() {
  const [EnCours, setEnCours] = useState(0);
  const [Realise, setRealise] = useState(0);
  const [Total, setTotal] = useState(0);
  const [TotalProjet, setTotalProjet] = useState(0);

  useEffect(() => {
    tacheService
      .getAllEnCours()
      .then((response) => {
        console.log(response);
        setEnCours(response.data.data.length);
      })
      .catch((error) => console.log(error));
    tacheService
      .getAll()
      .then((response) => {
        console.log(response);
        setTotal(response.data.data.length);
      })
      .catch((error) => console.log(error));
    tacheService
      .getAllRealiser()
      .then((response) => {
        console.log(response);
        setRealise(response.data.data.length);
      })
      .catch((error) => console.log(error));
    projetService
      .getAll()
      .then((response) => {
        console.log(response);
        setTotalProjet(response.data.data.length);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container className="container">
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Stack>

      <Grid container spacing={5}>
        <Grid item md={3}>
          <ShadowPaper>
            <div>NB de taches en cours</div>
            <div
              style={{
                color: "#253D7F",
              }}
            >
              {EnCours && EnCours}
            </div>
          </ShadowPaper>
        </Grid>
        <Grid item md={3}>
          <ShadowPaper>
            <div
              style={{
                fontWeight: "bold",
              }}
            >
              NB de taches realisé
            </div>
            <div
              style={{
                color: "#253D7F",
              }}
            >
              {Realise && Realise}
            </div>
          </ShadowPaper>
        </Grid>
        <Grid item md={3}>
          <ShadowPaper>
            <div>NB total de taches</div>{" "}
            <div
              style={{
                color: "#253D7F",
              }}
            >
              {Total && Total}
            </div>
          </ShadowPaper>
        </Grid>
        <Grid item md={3}>
          <ShadowPaper>
            <div>NB total de projets</div>{" "}
            <div
              style={{
                color: "#253D7F",
              }}
            >
              {TotalProjet && TotalProjet}
            </div>
          </ShadowPaper>
        </Grid>
      </Grid>
    </Container>
  );
}
