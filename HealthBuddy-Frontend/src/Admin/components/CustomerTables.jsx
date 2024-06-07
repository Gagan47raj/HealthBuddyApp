import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUser, deleteUser } from "../../States/User/Action";

const CustomerTables = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userState);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    dispatch(findUser());
  }, [dispatch,users.deleteUser]);

  return (
    <div className="p-5 bg-[#242B2E]">
      <Card className="mt-2">
        <CardHeader title="All Users" />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Addresses</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.address.map((address, index) => (
                        <div key={index}>
                          <p>{`${address.streetAddress}, ${address.city}, ${address.state}, ${address.zipCode}`}</p>
                          <p>{address.mobile}</p>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Button
                      onClick={() => handleDeleteUser(user.id)} 
                      variant="outlined">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </div>
  );
};

export default CustomerTables;
