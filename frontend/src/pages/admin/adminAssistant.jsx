import React, { useState, useEffect } from 'react';
import Assistant from '../../components/Assistant';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const AdminAssistantPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const queryRef = query(collection(db, "messages"));
      const querySnapshot = await getDocs(queryRef);
      const uids = new Set();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.uid) {
          uids.add(data.uid);
        }
      });
      setUsers([...uids]);
    };
    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log("current user", user);
  };

  return (
    <div className="flex flex-col md:flex-row  rounded-md m-2">
      <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 overflow-y-auto rounded-md h-[80vh]">
        <h2 className="text-xl font-semibold p-4 bg-blue-600 text-white">Users</h2>
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li 
              key={user} 
              onClick={() => handleUserClick(user)} 
              className={`p-4 hover:bg-gray-200 cursor-pointer transition-colors duration-150 ease-in-out ${selectedUser === user ? 'bg-blue-100' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 bg-white">
        {selectedUser ? (
          <Assistant role="admin" queryUid={selectedUser} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAssistantPage;