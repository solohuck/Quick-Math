import React, { useEffect, useState } from "react";
import axios from "axios";

function UserAccount() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.log("No token found. Please Login.");
        return;
      }
      try {
        const res = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user Data:", error);
      }
    };
    fetchUserData();
  }, []); // empty dependency array to run once on mount

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Welcome, {userData.email}</div>
    </>
  );
}

export default UserAccount;
