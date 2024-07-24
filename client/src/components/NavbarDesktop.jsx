import React from "react";
import { routes } from "../typeScript/routes";
import { Link } from "react-router-dom";

export const NavbarDesktop = () => {
  return (
    <>
      <nav className="primary-navigation" id="primary-navigation">
        <ul aria-label="Primary" role="list" className="nav-list">
          {routes.map((route) => {
            const { to, title } = route;
            return (
              <li key={route.title}>
                <Link to={to} className="nav-list-link">
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
