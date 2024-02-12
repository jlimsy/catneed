import { useEffect, useState } from "react";
import UsersTable from "../components/DashboardPage/UsersTable";
import { allUsers } from "../utilities/users-service";

export default function DashboardPage({ postal }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const all = await allUsers();
      setUsers(all);
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="flex justify-center bg-gradient-to-r from-sage-200 to-rust-200">
      <div className="mx-5 my-10 p-10 bg-ice-100 rounded-lg bg-opacity-50">
        <UsersTable users={users} postal={postal} />
      </div>
    </div>
  );
}
