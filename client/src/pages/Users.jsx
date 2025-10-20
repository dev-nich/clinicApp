import usersService from "../services/users";
import {  useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
const Users = () => {
  const [users, setUsers] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    setUsers(await usersService.getAll())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getAll()
  }, []);

  return (
    <>
      <h1>Users</h1>
      <Grid key="userList">
        {loading ? "loading" : users ? users.map((item) => {
          return (
            <>
            <Grid key={item.username}>
              <div>Name: {item.employee.person.first_name} {item.employee.person.middle_name} {item.employee.person.last_name} {item.employee.person.suffix}</div>
              <div>Username: {item.username}</div>
              <div>Email: {item.employee.person.email}</div>
              <div>Access: {item.access.title}</div>
            </Grid>
            </>
          )
          
        }) : "Users not found!"
      
      }
      </Grid>
    </>
  );
};

export default Users;
