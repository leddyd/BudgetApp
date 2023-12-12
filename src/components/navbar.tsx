import React, { useState } from "react"
import { Link } from "react-router-dom"
import { brandEnter, brandLeave } from "../utils/mouseEvents";

function CapitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function RenderNavbar() {
    const pills = ['features', 'about'];

    return (
      <nav className="navbar sticky-top bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/" onMouseEnter={brandEnter} onMouseLeave={brandLeave}>
              <i className="bi-wallet d-inline-block align-text-top"></i>
              WeGonBudget
            </Link>
            <ul className="nav nav-pills">
              {pills.map((pill) => (
                  <li className="nav-item"><Link className="nav-link" to={`/${pill}`}>{CapitalizeFirst(pill)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <Link className="nav-login" to="/login"><i className="bi bi-box-arrow-in-left login-arrow"></i>Log in</Link>
          </div>
        </div>
      </nav>
    );      
}



export default RenderNavbar