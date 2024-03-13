// src/pages/AdminPanel.js

import React from 'react';

const AdminPanel = () => {
  const deleteAllClimbs = async () => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete all climbs? This action cannot be undone.')) {
      try {
        // Make a DELETE request to the server
        const response = await fetch('http://localhost:3000/climbs', {
          method: 'DELETE',
        });

        if (response.ok) {
          // Notify the user of successful deletion
          alert('All climbs deleted successfully.');
          // Here you might also want to update the UI or state to reflect the deletion
        } else {
          // If the response is not ok, throw an error
          throw new Error('Failed to delete climbs');
        }
      } catch (error) {
        // Catch and display any errors
        alert(`Error deleting climbs: ${error}`);
      }
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={deleteAllClimbs}>Delete All Climbs</button>
    </div>
  );
};

export default AdminPanel;
