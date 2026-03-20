import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import UsersTable from "./components/UsersTable";
import Popup from "./components/Popup";
import type { UserType } from "./type";

function App() {
  const [users, setUsers] = useState<UserType[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [popup, setPopup] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error" | "info",
  });

  const usersPerPage = 5;

  const showPopup = (message: string, type: "success" | "error" | "info") => {
    setPopup({
      isVisible: true,
      message,
      type,
    });
  };

  const closePopup = () => {
    setPopup({ ...popup, isVisible: false });
  };

  const fetchUsers = async () => {
    const res = await axios.get("/api/User/");
    setUsers(res.data.data);
    // console.log(res.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Phone field: only allow numbers and max 10 digits
    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, [name]: phoneValue });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      showPopup("Please fill all fields", "error");
      return;
    }

    // Validate phone number - must start with 6, 7, 8, or 9
    if (!["6", "7", "8", "9"].includes(form.phone[0])) {
      showPopup("Phone number must start with 6, 7, 8, or 9", "error");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`/api/User/${editingId}`, form);
        showPopup("User Updated", "success");
      } else {
        await axios.post("/api/User/", form);
        showPopup("User Added", "success");
      }

      setForm({ name: "", email: "", phone: "" });
      setEditingId(null);

      fetchUsers();
    } catch (err) {
      console.log(err);
      showPopup("An error occurred", "error");
    }
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      <div className="form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone (start with 6, 7, 8, or 9)"
          value={form.phone}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          maxLength="10"
        />

        <button onClick={handleSubmit}>{editingId ? "Update" : "Add"}</button>
      </div>

      <UsersTable
        users={users}
        fetchUsers={fetchUsers}
        setForm={setForm}
        setEditingId={setEditingId}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        usersPerPage={usersPerPage}
        showPopup={showPopup}
      />

      <Popup
        message={popup.message}
        type={popup.type}
        isVisible={popup.isVisible}
        onClose={closePopup}
      />
    </div>
  );
}

export default App;
