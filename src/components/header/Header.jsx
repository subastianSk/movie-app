import React, { useRef, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import "./header.scss";

import logo from "../../assets/tmovie.png";
import { Uselogged } from "../../context/LoginContext";

let headerNav = [
  {
    display: "Home",
    path: "/"
  },
  {
    display: "Movies",
    path: "/movie"
  },
  {
    display: "TV Series",
    path: "/tv"
  },
  {
    display: "login",
    path: "/login"
  }
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) =>
    e.path === "/" ? e.path == pathname : pathname.startsWith(e.path)
  );
  const loginContext = Uselogged();
  headerNav[3].display = loginContext.state.logged == 0 ? "Login" : "Logout";
  console.log(headerNav[3].display);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">Newflix</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link
                to={{
                  pathname: e.path,
                  state: { from: pathname }
                }}
              >
                {e.display}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
