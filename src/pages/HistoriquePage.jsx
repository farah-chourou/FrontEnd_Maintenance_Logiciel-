import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

// @mui
import {
  Typography,
  Container,
  Stack,
  Button,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
} from "@mui/material";
import Avatar from "../components/Avatar/Avatar";
import { fDate } from "../utils/formatTime";
import projetService from "../services/projetService";

function HistoriquePage() {
  const [Projects, setProjects] = useState([]);
  useEffect(() => {
    projetService
      .getAllFinish()
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container className="container">
      <Helmet>
        <title> Base De Connaissances</title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Historique Des Projets Terminer
        </Typography>
      </Stack>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow hover>
              <TableCell>
                <b> #</b>
              </TableCell>
              <TableCell>
                <b>Titre </b>
              </TableCell>

              <TableCell>
                <b> Description</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Projects.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell>
                  <Avatar name={`${item.nom} ${item.prenom} `} />
                </TableCell>
                <TableCell>{item.nom}</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>{" "}
        </Table>
      </TableContainer>
    </Container>
  );
}

export default HistoriquePage;
