

function RenderGoals() {
    return (
        <div className="app-page-container">
            <div className="header-container hidden">
                <p className='mb-0 fs-4 text-body-emphasis fw-medium text-muted'>Objectives</p>
            </div>
            <div className="viz-container">
                <div className="objective-card plan hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your Plan</p>
                        </div>
                    </div>
                    <div className="card-content-wrapper">
                        <label htmlFor="income-field" className="form-label">After-Tax Income</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" id="income-field"/>
                            <span className="input-group-text">.00</span>
                        </div>
                        <label htmlFor="debt-slider" className="form-label">Debt</label>
                        <input type="range" className="form-range" id="debt-slider"></input>
                        <label htmlFor="savings-slider" className="form-label">Savings</label>
                        <input type="range" className="form-range" id="savings-slider"></input>
                        <label htmlFor="needs-slider" className="form-label">Needs</label>
                        <input type="range" className="form-range" id="needs-slider"></input>
                        <label htmlFor="wants-slider" className="form-label">Wants</label>
                        <input type="range" className="form-range" id="wants-slider"></input>
                    </div>
                </div>
                <div className="viz-card subscriptions hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Specific Goals</p>
                        </div>
                    </div>
                    <div className='expenses-list-group-container'>
                        <ol className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RenderGoals