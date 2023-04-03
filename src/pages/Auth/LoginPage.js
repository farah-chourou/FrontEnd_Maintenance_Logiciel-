import { Helmet } from "react-helmet-async";
import { useState, useContext } from "react";
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
import useResponsive from "../../hooks/useResponsive";
import Logo from "../../components/logo";
import Iconify from "../../components/iconify";
import authService from "src/services/authService";
import { UserContext } from "../../store/Contexts";
import Toastfunction from "src/utils/ToastFunction";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showmdp, setShowmdp] = useState(false);
  const [errormail, seterrormail] = useState("");
  const [errormdp, seterrormdp] = useState("");

  const { setUser, user } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({
    mail: "",
    mdp: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onLogin = (e) => {
    e.preventDefault();
    seterrormdp(false);
    seterrormail(false);
    authService
      .login(userInfo)
      .then((response) => {
        Toastfunction.TaostSuccess(
          `Bienvenue ${response.data.user.nom}  ${response.data.user.prenom}`
        );

        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        navigate("/app/dashboard");
      })
      .catch((error) => {
        if (error?.response.data.message === "Please verify your mail") {
          seterrormail(true);
        } else if (
          error?.response.data.message === "Please verify your password"
        ) {
          seterrormdp(true);
        }
        console.log(error);
      });
  };
  return (
    <div className="bg-light h-100">
      <Helmet>
        <title> Login </title>
      </Helmet>{" "}
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
          <Typography variant="h4" gutterBottom sx={{ paddingBottom: 3 }}>
            Connexion
          </Typography>
          <form onSubmit={(e) => onLogin(e)}>
            <Stack spacing={3}>
              <TextField
                name="mail"
                value={userInfo.mail}
                label="email"
                onChange={handleChange}
                required
                error={errormail}
                helperText={errormail ? "Email n'existe pas" : ""}
                type="email"
              />

              <TextField
                name="mdp"
                value={userInfo.mdp}
                required
                error={errormdp}
                helperText={errormdp ? "Mot de passe incorrect" : ""}
                onChange={handleChange}
                label="Mot de passe"
                type={showmdp ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowmdp(!showmdp)}
                        edge="end"
                      >
                        <Iconify
                          icon={showmdp ? "eva:eye-fill" : "eva:eye-off-fill"}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2, marginBottom: 3 }}
            >
              <Link
                variant="subtitle2"
                underline="hover"
                onClick={() => navigate("/login/oublierMdp")}
              >
                Vous avez oubliez votre mot de passe ?
              </Link>
            </Stack>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Connexion
            </LoadingButton>{" "}
          </form>
          mail : fafa@gmail.com / mot de passe : 123
        </Container>
      </div>
    </div>
  );
}
