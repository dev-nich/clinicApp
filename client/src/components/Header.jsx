import { NavLink } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
const Header = (props) => {
  const { isLoggedIn, username } = useContext(AuthContext);
  const navigation = [
    {
      name: "Login",
      url: "/login",
      authAccess: false
    },
    {
      name: "Test",
      url: "/test",
      authAccess: true,
    },
    {
      name: "Users",
      url: "/users",
      authAccess: true
    },
    {
      name: "Logout",
      url: "/logout",
      authAccess: true
    },
  ];

  return (
    <>
      <Grid container spacing={1}>
        {navigation.map((item) => {
          return (
            <Grid key="custom_nav">
                <NavLink key={item.name} to={item.url}>
                  {
                    isLoggedIn && item.authAccess ||
                    !isLoggedIn && !item.authAccess
                    ? item.name : ""
                  }
                </NavLink>
            </Grid>
          );
        })}
        <Grid>
         {isLoggedIn ? `Welcome ${username}!` : ""}

        </Grid>
      </Grid>
        <Divider />
      {props.children}
    </>
  );
};

export default Header;
