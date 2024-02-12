export default function UsersTable({ users }) {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-drab-800 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text font-bold text-gray-500 uppercase"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-center text font-bold text-gray-500 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text font-bold text-gray-500 uppercase"
                  >
                    Postal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text font-bold text-gray-500 uppercase"
                  >
                    Account
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text font-bold text-gray-500 uppercase"
                  >
                    Permission
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-onyx-300">
                {users.map((user) => (
                  <tr key={user._id} className="h-16">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {user.username}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      postal
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {user.isAdmin ? (
                        <span className="text-rust-500 font-bold">Admin</span>
                      ) : (
                        <span className="text-drab-800">Member</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium inline-flex items-center">
                      {user.isAdmin || (
                        <button
                          type="button"
                          className="text-sm font-semibold rounded-full py-1 px-2 border border-transparent text-blue-600 hover:bg-sage-300 disabled:opacity-50"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
