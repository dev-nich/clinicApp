import patientsService from "../services/patients";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
const Patients = () => {
  const [patients, setPatients] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    setPatients(await patientsService.getAll());
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getAll();
  }, []);

  return (
    <>
      <h1>Patients</h1>
      <Grid key="patientList">
        {loading
          ? "loading"
          : patients
          ? patients.map((item) => {
              return (
                <>
                  <Grid key={item.id}>
                    <div>Access: {item.person.first_name}</div>
                  </Grid>
                </>
              );
            })
          : "Patients not found!"}
      </Grid>
    </>
  );
};

export default Patients;
