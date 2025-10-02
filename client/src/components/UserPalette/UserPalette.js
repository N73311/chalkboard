import React from "react";
import "./UserPalette.styles.scss";
const UserPalette = ({ users }) => {
  return (
    <div className="user-palette">
      <h3>Users ({users.length})</h3>
      {users.length === 0 ? (
        <p style={{ opacity: 0.6, fontSize: '14px' }}>No users online</p>
      ) : (
        users.map((user, index) => (
          <p key={`${user}-${index}`}>{user}</p>
        ))
      )}
    </div>
  );
};

export default UserPalette;
