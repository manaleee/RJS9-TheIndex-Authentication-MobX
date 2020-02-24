import React from "react";
import { NavLink } from "react-router-dom";
import authStore from "./stores/authStore";
import { observer } from "mobx-react";
// Logo
import logo from "./assets/theindex.svg";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <img src={logo} className="logo" alt="the index logo" />
      <section>
        <h4 className="menu-item active">
          <NavLink to="/authors">AUTHORS</NavLink>
        </h4>
        <h4 className="menu-item">
          <NavLink to="/books">BOOKS</NavLink>
        </h4>
        {authStore.user ? (
          <Logout />
        ) : (
          <>
            <h4 className="menu-item">
              <NavLink to="/login">LOGIN</NavLink>
            </h4>
            <h4 className="menu-item">
              <NavLink to="/signup">SIGNUP</NavLink>
            </h4>
          </>
        )}
      </section>
    </div>
  );
};

export default observer(Sidebar);
