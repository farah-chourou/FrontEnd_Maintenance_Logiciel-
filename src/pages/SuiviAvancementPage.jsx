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
import TaskService from "../services/tacheService";
import Avatar from "../components/Avatar/Avatar";
import { fDate } from "../utils/formatTime";

function SuiviAvancementPage() {
  const [Tasks, setTasks] = useState([]);
  useEffect(() => {
    TaskService.getAll()
      .then((response) => {
        console.log(response);
        setTasks(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container className="container">
      <Helmet>
        <title> Suivi Avancement </title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Liste des Taches
        </Typography>
      </Stack>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow hover>
              <TableCell>
                <b> #</b>
              </TableCell>
              <TableCell padding="none">
                <b>Titre </b>
              </TableCell>

              <TableCell>
                <b> Type</b>
              </TableCell>
              <TableCell padding="none">
                <b>Date d'affectation </b>
              </TableCell>
              <TableCell>
                {" "}
                <b> Date de Cloture</b>{" "}
              </TableCell>
              <TableCell padding="none">
                {" "}
                <b> Etat </b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b> Projet </b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b> Développeur </b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b> Documentation </b>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Tasks.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Avatar name={`${item.nom} ${item.prenom} `} />
                </TableCell>
                <TableCell padding="none">{item.nom}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell padding="none">
                  {item.dateAffectation ? (
                    fDate(item.dateAffectation)
                  ) : (
                    <span className="neant">Néant </span>
                  )}
                </TableCell>{" "}
                <TableCell>
                  {item.dateCloture ? (
                    fDate(item.dateCloture)
                  ) : (
                    <span className="neant">Néant </span>
                  )}
                </TableCell>{" "}
                <TableCell padding="none">
                  {" "}
                  {item.etat === "En Cours" ? (
                    <span className="etatEnCours"> {item.etat} </span>
                  ) : item.etat === "Réaliser" ? (
                    <span className="etatRealiser"> {item.etat} </span>
                  ) : item.etat === "Affecter" ? (
                    <span className="etatAffecter"> {item.etat} </span>
                  ) : item.etat === "A faire" ? (
                    <span className="etatAFaire"> {item.etat} </span>
                  ) : (
                    <span className=""> {item.etat} </span>
                  )}
                </TableCell>
                <TableCell>{item.idProjet.nom}</TableCell>
                <TableCell>{item.idDeveloper.nom}</TableCell>
                <TableCell>
                  {item.documentation ? (
                    "pdf "
                  ) : (
                    <span className="neant">Néant </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>{" "}
        </Table>
      </TableContainer>
    </Container>
  );
}

export default SuiviAvancementPage;
