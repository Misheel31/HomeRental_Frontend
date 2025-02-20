import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 p-4 h-full">
      <h2 className="text-3xl font-bold mb-4">Registered Users</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            {/* <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
