import axios from "axios";
import type { UserType } from "../type";

interface Props {
  users: UserType[];
  fetchUsers: () => void;
  setForm: any;
  setEditingId: any;
  currentPage: number;
  setCurrentPage: any;
  usersPerPage: number;
  showPopup: (message: string, type: "success" | "error" | "info") => void;
}

const UsersTable = ({
  users,
  fetchUsers,
  setForm,
  setEditingId,
  currentPage,
  setCurrentPage,
  usersPerPage,
  showPopup,
}: Props) => {
  const indexLast = currentPage * usersPerPage;
  const indexFirst = indexLast - usersPerPage;

  const currentUsers = users.slice(indexFirst, indexLast);

  const totalPages = Math.ceil(users.length / usersPerPage);

  // Pagination logic - show max 5 buttons
  const getVisiblePages = () => {
    const maxVisible = 5;
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      // If total pages <= 5, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Always include first page
    pages.push(1);
    
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust range to always show 3 pages in middle (or more if near edges)
    if (currentPage <= 2) {
      endPage = Math.min(totalPages - 1, 4);
    } else if (currentPage >= totalPages - 1) {
      startPage = Math.max(2, totalPages - 3);
    }
    
    // Add ellipsis if needed
    if (startPage > 2) {
      pages.push("...");
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }
    
    // Always include last page
    pages.push(totalPages);
    
    return pages;
  };

  const handleEdit = (user: UserType) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });

    setEditingId(user.id);
  };

  const handleDelete = async (id: number) => {
    const isDelete = confirm(`Are you sure to delete this user data?`);
    if(!isDelete){
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/User/${id}`);

      showPopup("User Deleted", "success");

      fetchUsers();
    } catch (err) {
      console.log(err);
      showPopup("Failed to delete user", "error");
    }
  };

  return (
    <div className="table-container">
      {users.length === 0 ? (
        <div className="no-data-message">
          <p>📭 No users found</p>
          <p className="no-data-subtitle">Add a new user to get started</p>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user,index) => (
                <tr key={user.id}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(user)} 
                      className="edit-btn"
                      title="Edit user"
                    >
                      <i className="fas fa-pen"></i>
                    </button>

                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="delete-btn"
                      title="Delete user"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p: number) => p - 1)}
            >
              Prev
            </button>

            {getVisiblePages().map((page, i) => (
              <button
                key={i}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={typeof page === "string"}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p: number) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersTable;
