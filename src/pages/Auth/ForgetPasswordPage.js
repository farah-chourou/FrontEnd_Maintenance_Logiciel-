import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useResponsive from "../../hooks/useResponsive";
import Logo from "../../components/logo";
import Iconify from "../../components/iconify";

const icon = (
  <Paper sx={{ m: 1 }}>
    <Box component="svg" sx={{ width: 150, height: 150 }}>
      <CheckCircleOutlineIcon color="primary" />
    </Box>
  </Paper>
);
export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const [errorMail, seterrorMail] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onRecover = (e) => {
    e.preventDefault();
  };
  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="bg-light h-100">
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>
      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, sm: 24, md: 40 },
          left: { xs: 16, sm: 24, md: 40 },
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            p: 4,
          }}
        >
          {checked ? (
            <>
              <Typography variant="h4" gutterBottom sx={{ paddingBottom: 3 }}>
                Mot de passe envoyé avec succès{" "}
              </Typography>
              <Box
                sx={{
                  height: 120,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Zoom
                  in={checked}
                  style={{ transitionDelay: checked ? "500ms" : "0ms" }}
                >
                  {icon}
                </Zoom>
              </Box>
              <LoadingButton
                sx={{ mt: 4 }}
                fullWidth
                size="large"
                variant="outlined"
                onClick={handleNavigate}
              >
                Revenir à la page de login
              </LoadingButton>{" "}
            </>
          ) : (
            <>
              {" "}
              <Typography variant="h4" gutterBottom sx={{ paddingBottom: 3 }}>
                Récupérer votre mot de passe{" "}
              </Typography>
              <form onSubmit={(e) => onRecover(e)}>
                <Stack spacing={3}>
                  <TextField
                    name="email"
                    value={userInfo.email}
                    label="Entrer votre mail ici "
                    onChange={handleChange}
                    required
                    error={errorMail}
                    helperText={errorMail ? "Mail invalide" : ""}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ my: 2 }}
                >
                  <Typography
                    variant="subtitle2"
                    underline="hover"
                    color="#3f51b5"
                    sx={{ p: 0.5 }}
                  >
                    On va vous envoyer un nouveau mot de passe à votre email.
                  </Typography>
                </Stack>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Récupérer
                </LoadingButton>{" "}
                <LoadingButton
                  sx={{ mt: 1 }}
                  fullWidth
                  size="large"
                  variant="outlined"
                  onClick={handleNavigate}
                >
                  Revenir à la page de login
                </LoadingButton>{" "}
              </form>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}
