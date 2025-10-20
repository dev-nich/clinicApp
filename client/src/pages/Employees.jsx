import employeesService from "../services/employees";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
const Employees = () => {
  const [employees, setEmployees] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    setEmployees(await employeesService.getAll());
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getAll();
  }, []);

  return (
    <>
      <h1>Employee</h1>
      <Grid key="employeeList">
        {loading
          ? "loading"
          : employees
          ? employees.map((item) => {
              return (
                <>
                  <Grid key={item.id}>
                    <div>
                      Name: {item.person.first_name} {item.person.middle_name}{" "}
                      {item.person.last_name} {item.person.suffix}
                    </div>
                    <div>Position: {item.position.title}</div>
                    <div>Hired: {item.hire_date}</div>
                  </Grid>
                </>
              );
            })
          : "Employees not found!"}
      </Grid>
    </>
  );
};

export default Employees;
