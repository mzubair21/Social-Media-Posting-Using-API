import React from "react";
import { useSelector } from "react-redux";

export default function Nav() {
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    alert("You have been logged out");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <button className="navbar-brand" href="#">
        RippleBerry
      </button>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <button className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </button>
          </li>
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Social Media
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <button className="dropdown-item" href="#">
                Facebook
              </button>
              <button className="dropdown-item" href="#">
                Instagram
              </button>
            </div>
          </li>
        </ul>
        {user.name ? (
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <button className="navbar-brand" href="#">
                  {user.name}
                </button>
                <img
                  src={user.Image}
                  className="img-fluid rounded-circle"
                  alt=""
                />
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <button className="dropdown-item" href="#">
                  Facebook
                </button>
                <button className="dropdown-item" href="#">
                  Instagram
                </button>
                <button
                  onClick={handleLogout}
                  className="dropdown-item"
                  href="#"
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
}
