import React, { useState } from "react"
import { Link } from "react-router-dom"

function RenderUserNavbar() {
    const pills = [
        {page: '/expenses', icon: 'bi bi-pie-chart-fill'}, 
        {page: '/goals', icon: 'bi bi-clipboard-check-fill'},
        {page: '/achievements', icon: 'bi bi-trophy-fill'},
    ]

    return (
        <nav className="user-nav-container">
            <ul className="user-nav nav flex-column align-items-center nav-pills">
                <li className="user-nav-item nav-item">
                    <Link className="user-nav-link nav-link" to="/profile"><i className="bi bi-person-circle"></i></Link>
                </li>
                <hr className="user-nav-hr"></hr>
                {pills.map((pill) => (
                    <li className="user-nav-item nav-item">
                        <Link className="user-nav-link nav-link" to={`${pill.page}`}><i className={`${pill.icon}`}></i></Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default RenderUserNavbar