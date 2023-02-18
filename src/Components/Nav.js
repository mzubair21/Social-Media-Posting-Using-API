import React from "react";
import { useSelector } from "react-redux";

export default function Nav() {
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    alert("You have been logged out");
  };

  return (
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <button class="navbar-brand" href="#">
        RippleBerry
      </button>
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <button class="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </button>
          </li>
          <li class="nav-item dropdown">
            <button
              class="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Social Media
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownId">
              <button class="dropdown-item" href="#">
                Facebook
              </button>
              <button class="dropdown-item" href="#">
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
