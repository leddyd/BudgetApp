
function RenderExpenses() {
    return (
        <div className="expenses-container">
            <div className="header-container"></div>
            <div className="summary-container"></div>
            <div className="viz-container">
                <div className="viz-card chart"></div>
                <div className="viz-card expenses"></div>
                <div className="viz-card categories"></div>
            </div>
        </div>
    )
}

export default RenderExpenses