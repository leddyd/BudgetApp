import LineChart from "../charts/lineChart"

function RenderAchievements() {
    return (
        <div className="app-page-container">
            <div className="header-container hidden">
                <p className='mb-0 fs-4 text-body-emphasis fw-medium text-muted'>Achievements</p>
            </div>

            <div className="goals-container">
                <div className="objective-card achievements hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your Awards</p>
                        </div>
                    </div>
                    <div className='goals-list-group-container'>
                        <ol className="list-group">
                            <li className="list-group-item d-flex align-items-center">
                                <i className="bi-wallet"></i>
                                <div className="ms-1 me-4 small">
                                    <div className="fw-bold">Save $500</div>
                                    Completed 5/31
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="objective-card savings hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your Savings & Debt</p>
                        </div>
                    </div>
                    <div className="line-chart-container">
                        <LineChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RenderAchievements