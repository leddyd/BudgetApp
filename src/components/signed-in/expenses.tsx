import ProgressBar from '../charts/progressBar';

function RenderExpenses() {
    return (
        <div className="expenses-container">
            <div className="header-container">
                {/* Add content here if needed */}
            </div>
            <div className="summary-container hidden">
                <div className="balance-container">
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your balance</p>
                    <h2 className="fw-bold">$530,000.50</h2>
                    <div className="income-spending-container">
                        <div className="income-container">
                            <small className="fw-medium">$500</small>
                            <br />
                            <small className="fw-medium text-muted">Week's Income</small>
                        </div>
                        <div className="spending-container">
                            <small className="fw-medium">$500</small>
                            <br />
                            <small className="fw-medium text-muted">Week's Spending</small>
                        </div>
                    </div>
                </div>
                <div className="progress-container">
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your budget</p>
                    <ProgressBar />
                </div>
            </div>
            <div className="viz-container">
                <div className="viz-card chart hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Expenses</p>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle " href="#" role="button" aria-expanded="false">
                                            Month
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="viz-card expenses hidden"></div>
                <div className="viz-card categories hidden"></div>
            </div>
        </div>
    );
}

export default RenderExpenses;
