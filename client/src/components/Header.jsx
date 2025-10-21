import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PAGES } from "../constants/pages";
import { useEffect, useState } from "react";

const Header = (props) => {
  const { isLoggedIn, username, setUsername, login } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token) {
      login();
      setUsername(username);
    }
  }, []);
  return (
    <>
      <Grid container spacing={1}>
        {PAGES.sort((a, b) => a.order - b.order).map((item) => {
          return (
            <Grid key={item.name}>
              <NavLink key={item.name} to={item.path}>
                {(isLoggedIn && item.authAccess) ||
                (!isLoggedIn && !item.authAccess)
                  ? item.name
                  : ""}
              </NavLink>
            </Grid>
          );
        })}
        <Grid>{isLoggedIn ? `Welcome ${username}!` : ""}</Grid>
      </Grid>
      <Divider />
      {props.children}
    </>
  );
};

export default Header;
