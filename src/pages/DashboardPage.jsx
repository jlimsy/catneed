import { useEffect, useState } from "react";
import UsersTable from "../components/DashboardPage/UsersTable";
import { allUsers } from "../utilities/users-service";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const all = await allUsers();
      setUsers(all);
    };

    fetchAllUsers();
  }, []);

  return <UsersTable users={users} />;
}
