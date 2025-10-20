import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import loginService from "../services/login";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUsername, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    await loginService
      .login({
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.username);
        login();
        setUsername(response.username);
        navigate("/dashboard");
      });
  };

  return (
    <>
      <Container>
        <Box>
          <Typography>Sign In</Typography>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box>
            <TextField
              id="username"
              name="username"
              label="Username"
              margin="normal"
              autoComplete="username"
            />
          </Box>
          <Box>
            <TextField
              id="password"
              name="password"
              label="Password"
              margin="normal"
              type="password"
              autoComplete="current-password"
            />
          </Box>

          <Box>
            <Button type="submit" variant="outlined">
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
