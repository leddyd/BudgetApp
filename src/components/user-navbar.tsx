import React, { useState } from "react"
import { Link } from "react-router-dom"

function RenderUserNavbar() {
    const [expanded, setExpanded] = useState(false);
    
    const pills = [
        { page: '/expenses', icon: 'bi bi-pie-chart-fill', text: 'Expenses' },
        { page: '/goals', icon: 'bi bi-clipboard-check-fill', text: 'Goals' },
        { page: '/achievements', icon: 'bi bi-trophy-fill', text: 'Achievements' },
    ];

    const toggleNavbar = () => {
        setExpanded(!expanded);
    };

    return (
        <nav className={`user-nav-container ${expanded ? 'expanded' : ''}`}>
            <ul className={`user-nav nav flex-column ${expanded ? "align-items-start" : "align-items-center"} nav-pills`}>
                    <li className="user-nav-item nav-item align-self-center">
                        <button className="user-nav-link nav-link " onClick={toggleNavbar}><i className="bi bi-list icon-contracted"></i></button>
                    </li>
                    <hr className="user-nav-hr"></hr>
                    {pills.map((pill, index) => (
                        <li key={index} className={`user-nav-item nav-item ${expanded ? "ms-1 link-expanded" : ""}`}>
                            <Link className={`user-nav-link nav-link ${expanded ? "link-expanded" : ""}`} to={`${pill.page}`}>
                                <i className={`${pill.icon} ${expanded ? "icon-expanded" : "icon-contracted"}`}></i>
                                {expanded && <span className={`text-truncate text-nowrap ${expanded ? "visible" : "hidden"}`}>{pill.text}</span>}
                            </Link>
                        </li>
                    ))}
                    <div className="home-tab">
                        <li className="user-nav-item nav-item">
                            <Link className="user-nav-link nav-link" to="/"><i className="bi bi-compass-fill icon-contracted"></i></Link>
                        </li>
                    </div>
            </ul>
        </nav>
    );
}

export default RenderUserNavbar