import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
const Layout = ({children }) => {
  return (
    <Grid container>
      <h1>Clinic Web App</h1>
      <main>{children}</main>
    </Grid>
  );
};

export default Layout;
