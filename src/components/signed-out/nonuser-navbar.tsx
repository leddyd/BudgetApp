import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ChangeIcon } from "../../utils/mouseEvents";

function CapitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function RenderNonUserNavbar() {
    const pills = ['features', 'about'];

    return (
      <nav className="nonuser-navbar navbar sticky-top bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link 
              className="nonuser-navbar-brand navbar-brand" 
              to="/" 
              onMouseEnter={() => ChangeIcon('.bi-wallet', 'bi-wallet', 'bi-wallet2')} 
              onMouseLeave={() => ChangeIcon('.bi-wallet2', 'bi-wallet2', 'bi-wallet')}>
              <i className="bi-wallet d-inline-block align-text-top"></i>
              WeGonBudget
            </Link>
            <ul className="nav nav-pills">
              {pills.map((pill) => (
                  <li className="nonuser-nav-item nav-item"><Link className="nonuser-nav-link nav-link" to={`/${pill}`}>{CapitalizeFirst(pill)}</Link></li>
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



export default RenderNonUserNavbar