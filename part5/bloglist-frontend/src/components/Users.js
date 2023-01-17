import React, { useEffect } from "react";
import userService from '../services/users';
import {initUsers} from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import {Table, Form} from 'react-bootstrap'
const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)

    useEffect(() => {
        userService.getAll().then(users => {
          dispatch(initUsers(users));
        })}, []);

    return (
        <div>
            <h2>Users</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
            </thead>
            </Table>
        </div>
    )
}
export default Users