import React from "react";
import { NavLink, Link } from "react-router-dom";
import { observer } from "mobx-react";

// Logo
import logo from "./assets/theindex.svg";

// Store
import authStore from "./stores/authStore";

// Components
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
      </section>
      <div className="fixed-bottom m-3">
        {authStore.user ? (
          <Logout />
        ) : (
          <Link to="/login">
            <button className="btn btn-default">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default observer(Sidebar);
