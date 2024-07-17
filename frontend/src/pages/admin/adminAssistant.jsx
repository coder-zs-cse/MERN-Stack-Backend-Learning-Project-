import React, { useState, useEffect } from 'react';
import Chat from '../../components/Chat'; // Assuming Chat is in the same directory
import Assistant from '../../components/Assistant';

const AdminAssistantPage = () => {
  const [users, setUsers] = useState([]); // List of users
  const [selectedUser, setSelectedUser] = useState(null); // Currently selected user

  useEffect(() => {
    // Fetch the list of users from the backend or use mock data
    // This is a placeholder, replace with actual fetch call
    const mockUsers = [
      "Rsh3WZPkpNhtytJwKHewTSVv59Q2", "oKPqANHDWSSiN1YyaeGYazjg8sq2", "3"
    ];
    setUsers(mockUsers);
  }, []);

  const handleUserClick = (user) => {

    setSelectedUser(user);
    console.log("current user",user);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '30%', overflowY: 'auto' }}>
        <ul>
          {users.map((user) => (
            <li key={user} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        {selectedUser && (
          
            <Assistant role="admin" queryUid={selectedUser} />
        )}
      </div>
    </div>
  );
};

export default AdminAssistantPage;