import Table from "../../components/Table";
import { useEffect, useState } from "react";
import axios from "../../helpers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilteredBy from "../../components/FilteredBy";

function Dashboard() {
  let [users, setUsers] = useState(null);
  let [filteredUsers, setFilteredUsers] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetch = async () => {
      try {
        setLoading(true);
        let res = await axios.get("/api/admin/dashboard");
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    fetch();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/admin/user/${userId}`);
      setUsers((users) => users.filter((user) => user._id !== userId));
      toast(response.data.message, {
        autoClose: 2000,
        position: "top-right",
        type: "success",
      });
    } catch (error) {
      toast(error.response.data.error, {
        autoClose: 2000,
        position: "top-right",
        type: "error",
      });
    }
  };

  const filteredByName = (name) => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  const sortBy = (filter, isAscending) => {
    const sortFactor = isAscending ? 1 : -1;
    const sortedUsers = [...users].sort((a, b) => {
      if (filter === "name") {
        return a.name.localeCompare(b.name) * sortFactor;
      } else if (filter === "createdAt") {
        return (new Date(b.createdAt) - new Date(a.createdAt)) * sortFactor;
      } else {
        return 0;
      }
    });
    setFilteredUsers(sortedUsers);
  };

  return (
    <>
      <FilteredBy
        filteredBySearch={filteredByName}
        sortBy={sortBy}
        sortedArrays={["name", "createdAt"]}
        placeholder="Search by name..."
      />
      {loading && <span className="loading mx-auto"></span>}
      {filteredUsers?.length > 0 && (
        <Table>
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Image
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Admin
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                CreatedAt
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredUsers?.length > 0 &&
              filteredUsers.map((user) => (
                <tr className="hover:bg-gray-50" key={user._id}>
                  <th className="px-6 py-4 font-normal text-gray-900">
                    <div className="font-medium text-gray-700">{user.name}</div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="text-gray-700">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative h-10 w-10">
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={`${import.meta.env.VITE_BACKEND_ACCESS_URL}/${
                          user.photo_url
                        }`}
                        alt={user.photo_url}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.isAdmin && (
                      <i className="fa-solid fa-check text-xl text-green-500"></i>
                    )}
                    {!user.isAdmin && (
                      <i className="fa-solid fa-xmark text-xl text-red-500"></i>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <i
                        className="fa-solid fa-trash text-xl hover:text-red-500 duration-150 cursor-pointer"
                        onClick={() => deleteUser(user._id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      <ToastContainer />
    </>
  );
}

export default Dashboard;
