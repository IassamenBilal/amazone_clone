import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../../actions/user.actions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function ListUsers(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, deleteSuccess]);

  const handleDelete = (id) => {
    window.confirm("Delete user ?") && dispatch(deleteUser(id));
  };
  const handleUpdate = (id) => {
    props.history.push(`/user/${id}/edit`);
  };
  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variat="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>IS ADMIN</th>

            <th>ACTIONS</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => handleUpdate(user._id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
