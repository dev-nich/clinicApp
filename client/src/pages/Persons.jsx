import personsService from "../services/persons";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

const Persons = () => {
  const [persons, setPersons] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    setPersons(await personsService.getAll());
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getAll();
  }, []);

  const PersonList = () => {
    return (
      <Grid container key="personsList" spacing={2}>
        {loading
          ? "loading"
          : persons
          ? persons.map((item) => {
              return (
                <Grid key={item.id} size={6}>
                  <div>
                    Name: {item.first_name} {item.middle_name} {item.last_name}{" "}
                    {item.suffix}
                  </div>
                  <div>Gender: {item.gender} </div>
                  <div>Contact: {item.contact} </div>
                  <div>Email: {item.email} </div>
                  <div>Address: {item.address} </div>
                </Grid>
              );
            })
          : "Persons not found!"}
      </Grid>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const personRequestBody = {
      first_name: data.get("first_name"),
      middle_name: data.get("middle_name"),
      last_name: data.get("last_name"),
      suffix: data.get("suffix"),
      address: data.get("address"),
      contact: data.get("contact"),
      birth_date: "2020/01/01",
      gender: "F",
    }

    console.log("submitting person", personRequestBody)

    await personsService.create(personRequestBody)
    getAll()
  }

  const PersonAdd = () => {
    return (
      <Container key="personAdd">
        <Box>
          <Typography>Add Person</Typography>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box>
            <TextField
              id="first_name"
              name="first_name"
              label="First Name"
              margin="normal"
            />
            <TextField
              id="middle_name"
              name="middle_name"
              label="Middle Name"
              margin="normal"
            />
            <TextField
              id="last_name"
              name="last_name"
              label="Last Name"
              margin="normal"
            />
            <TextField
              id="suffix"
              name="suffix"
              label="Suffix"
              margin="normal"
            />
          </Box>
          <Box>
            <TextField
              id="address"
              name="address"
              label="Address"
              margin="normal"
            />
            <TextField
              id="contact"
              name="contact"
              label="contact"
              margin="normal"
            />
          </Box>
          <Box>
            <Button type="submit" variant="outlined">
              Add
            </Button>
          </Box>
        </Box>
      </Container>

    )
  }

  return (
    <>
      <h1>Persons</h1>
      <Grid container spacing={2}>
        <Grid size={4}>
        <PersonAdd />
        </Grid>
        <Grid size={8}>
        <PersonList />
        </Grid>
      </Grid>
      
      
    </>
  );
};

export default Persons;
