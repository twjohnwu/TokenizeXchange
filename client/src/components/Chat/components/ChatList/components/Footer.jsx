// @ts-check

import React from "react";
import { Power } from "react-bootstrap-icons";

const Footer = ({ user, onLogOut }) => (
  <div
    className="row no-gutters align-items-center pl-4 pr-2 pb-3"
    style={{ height: "inherit", flex: 0, minHeight: 50 }}
  >
    {true ? (
      <>
        <UserInfo user={user} col={8} />
        <LogoutButton onLogOut={onLogOut} col={4} />
      </>
    ) : (
      <>
        <LogoutButton noinfo onLogOut={onLogOut} col={8} />
        <UserInfo noinfo user={user} col={4} />
      </>
    )}
  </div>
);

const LogoutButton = ({ onLogOut, col = 5, noinfo = false }) => (
  <div
    onClick={onLogOut}
    style={{ cursor: "pointer" }}
    className={`col-${col} text-danger ${!noinfo ? "text-right" : ""}`}
  >
    <Power /> Log out
  </div>
);

const UserInfo = ({ user, col = 7, noinfo = false }) => (
  <div
    className={`col-${col} d-flex align-items-center ${
      noinfo ? "justify-content-end" : ""
    }`}
  >
  </div>
);

export default Footer;
