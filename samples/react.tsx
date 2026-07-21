// TSX sample — React with TypeScript.
// Highlights: JSX (green), module types (blue), types/interfaces (aqua),
// import/export (purple italic when enabled).

import React, { useState, useEffect } from "react";

interface UserProps {
  id: number;
  name: string;
  onActivate?: (id: number) => void;
}

type Status = "active" | "inactive" | "pending";

export const UserProfile: React.FC<UserProps> = ({ id, name, onActivate }) => {
  const [status, setStatus] = useState<Status>("pending");

  useEffect(() => {
    if (id > 0) {
      setStatus("active");
    }
  }, [id]);

  return (
    <div className="user-profile" data-user-id={id}>
      <h1>{name}</h1>
      <button onClick={() => onActivate?.(id)}>Activate</button>
      <span className={`status status-${status}`}>{status}</span>
    </div>
  );
};

export default UserProfile;