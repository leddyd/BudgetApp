
function RenderAchievements() {

    return (
        <div className="app-page-container">
            <div className="header-container hidden">
                <p className='mb-0 fs-4 text-body-emphasis fw-medium text-muted'>Achievements</p>
            </div>

            <div className="goals-container">
                <div className="objective-card plan hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your Accomplishments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RenderAchievements