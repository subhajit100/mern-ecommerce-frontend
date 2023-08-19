import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
      <h1 className="mx-auto text-2xl xs:px-4">My Profile</h1>
        <UserProfile />
      </Navbar>
    </div>
  );
};

export default UserProfilePage;
