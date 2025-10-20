import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import loginService from '../services/login'
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from 'react';

const Logout = () => {
    const {isLoggedIn, logout, setUsername} = useContext(AuthContext)
    useEffect(()=>{
        logout()
        setUsername(false)
    },[])

    return <>
        <Container>
            You are logged {isLoggedIn ? "in" : "out"}
        </Container>
    </>


}

export default Logout