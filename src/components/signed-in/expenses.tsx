import ProgressBar from '../charts/progressBar';

function RenderExpenses() {
    return (
        <div className="expenses-container">
            <div className="header-container">
                
            </div>
            <div className="summary-container hidden">
                <div className="balance-container">
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your balance</p>
                    <h2 className="fw-bold">$530,000.50</h2>
                    <div className="income-spending-container">
                        <div className="income-container">
                            <small className="fw-medium">$500</small>
                            <br></br>
                            <small className="fw-medium text-muted">Week's Income</small>
                        </div>
                        <div className="spending-container">
                            <small className="fw-medium">$500</small>
                            <br></br>
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
                <div className="viz-card chart hidden"></div>
                <div className="viz-card expenses hidden"></div>
                <div className="viz-card categories hidden"></div>
            </div>
        </div>
    )
}

export default RenderExpenses