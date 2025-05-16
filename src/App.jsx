import { useState } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState([
    { id: 1, name: "kastro", status: false, age: 21 },
    { id: 2, name: "kastro", status: false, age: 22 },
    { id: 3, name: "kastro", status: false, age: 23 },
    { id: 4, name: "kastro", status: true, age: 24 },
  ]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // фильтр по статусу
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);

  function handleAdd() {
    const newUser = {
      name,
      id: Date.now(),
      age: +age,
      status,
    };
    setData([...data, newUser]);
    setName("");
    setAge("");
    setStatus(false);
  }

  function handleDelete(id) {
    setData(data.filter((user) => user.id !== id));
  }

  function checkTodo(id) {
    setData(
      data.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  }

  function handleChek(user) {
    checkTodo(user.id);
  }

  function handleModal(user) {
    setEdit(true);
    setEditUser(user);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    setData(data.map((user) => (user.id === editUser.id ? { ...editUser } : user)));
    setEdit(false);
    setEditUser(null);
  }

  // Фильтрация по имени и статусу (с правильной логикой)
  const filterData = data.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(search.toLowerCase());
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "active" && user.status === true) ||
      (filterStatus === "inactive" && user.status === false);
    return nameMatch && statusMatch;
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Фильтр по статусу */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="all">Все</option>
        <option value="active">Активные</option>
        <option value="inactive">Неактивные</option>
      </select>

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {/* Важно: здесь приводим к булевому */}
      <select onChange={(e) => setStatus(e.target.value === "true")} value={String(status)}>
        <option value="false">Inactive</option>
        <option value="true">Active</option>
      </select>
      <input
        type="number"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <button onClick={handleAdd}>Add</button>

      {edit && editUser && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            top: 0,
            left: 0,
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "400px", backgroundColor: "#fff", padding: "20px" }}>
            <h2>Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
              <br />
              <br />
              <input
                type="number"
                value={editUser.age}
                onChange={(e) =>
                  setEditUser({ ...editUser, age: +e.target.value })
                }
              />
              <br />
              <br />
              <select
                value={String(editUser.status)}
                onChange={(e) =>
                  setEditUser({ ...editUser, status: e.target.value === "true" })
                }
              >
                <option value="false">Inactive</option>
                <option value="true">Active</option>
              </select>
              <br />
              <br />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEdit(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td style={user.status ? { textDecoration: "line-through" } : {}}>
                {user.name}
              </td>
              <td>{user.age}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <input
                  type="checkbox"
                  onChange={() => handleChek(user)}
                  checked={user.status}
                />
                <button onClick={() => handleModal(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
