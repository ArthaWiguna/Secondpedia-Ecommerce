import React from "react";
import NavigationBar from "../components/NavigationBar";
import DropdownAccount from "../components/DropdownAccount";
import { Helmet } from "react-helmet";

const UserAccount = () => {
  return (
    <div className="px-2">
      <Helmet>
        <title>Secondpedia | Profile</title>
      </Helmet>
      <NavigationBar />
      <DropdownAccount />
    </div>
  );
};

export default UserAccount;
