import { useState } from "react";
import AddGoalModal from "../modals/add-goal";

function RenderGoals() {
    const [debtValue, setDebtValue] = useState(25);
    const [savingsValue, setSavingsValue] = useState(25);
    const [needsValue, setNeedsValue] = useState(25);
    const [wantsValue, setWantsValue] = useState(25);
    const [showGoalModal, setShowGoalModal] = useState(false);
    
    const handleDebtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(e.target.value);
        let maxValue = 100 - needsValue - wantsValue - savingsValue;

        if (maxValue - newValue < 0) {
            setDebtValue(maxValue);
        } else {
            setDebtValue(newValue);
        }
    };

    const handleSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(e.target.value);
        let maxValue = 100 - needsValue - wantsValue - debtValue;

        if (maxValue - newValue < 0) {
            setSavingsValue(maxValue);
        } else {
            setSavingsValue(newValue);
        }
    };

    const handleNeedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(e.target.value);
        let maxValue = 100 - savingsValue - wantsValue - debtValue;

        if (maxValue - newValue < 0) {
            setNeedsValue(maxValue);
        } else {
            setNeedsValue(newValue);
        }
    };

    const autoApplyPlan = () => {
        setSavingsValue(20)
        setNeedsValue(50)
        setWantsValue(30)
        setDebtValue(0)
    }

    const handleWantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(e.target.value);
        let maxValue = 100 - needsValue - savingsValue - debtValue;

        if (maxValue - newValue < 0) {
            setWantsValue(maxValue);
        } else {
            setWantsValue(newValue);
        }
    };

    const toggleGoalModal = () => {
        setShowGoalModal(!showGoalModal);
    }

    return (
        <div className="app-page-container">
            <div className="header-container hidden">
                <p className='mb-0 fs-4 text-body-emphasis fw-medium text-muted'>Objectives</p>
            </div>
            <div className="goals-container">
                <div className="objective-card plan hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your Plan</p>
                        </div>
                    </div>
                    <div className="card-content-wrapper">
                        <label htmlFor="income-field" className="form-label">After-Tax Monthly Income</label>
                        <div className="input-group mb-4">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" id="income-field"/>
                            <span className="input-group-text">.00</span>
                        </div>
                        <label htmlFor="debt-slider" className="form-label mt-4">
                            Debt
                            <span className="slider-value">{debtValue}%</span>
                        </label>
                        <input type="range" className="form-range" id="debt-slider" step="1" value={debtValue} onChange={handleDebtChange}></input>
                        <label htmlFor="savings-slider" className="form-label">
                            Savings
                            <span className="slider-value">{savingsValue}%</span>
                        </label>
                        <input type="range" className="form-range" id="savings-slider" step="1" value={savingsValue} onChange={handleSavingsChange}></input>
                        <label htmlFor="needs-slider" className="form-label">
                            Needs
                            <span className="slider-value">{needsValue}%</span>
                        </label>
                        <input type="range" className="form-range" id="needs-slider" step="1" value={needsValue} onChange={handleNeedsChange}></input>
                        <label htmlFor="wants-slider" className="form-label">
                            Wants
                            <span className="slider-value">{wantsValue}%</span>
                        </label>
                        <input type="range" className="form-range mb-4  " id="wants-slider" step="1" value={wantsValue} onChange={handleWantsChange}></input>
                    </div>
                    <button className="auto-plan text-link" onClick={autoApplyPlan}><i className="bi bi-check2-square"></i>Apply our suggested plan</button>
                </div>
                <div className="objective-card objectives hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Goals</p>
                            <button type="button" className="btn add-goal-btn" onClick={toggleGoalModal}>
                                <i className="bi bi-plus"></i>
                            </button>
                            {showGoalModal && <AddGoalModal onClose={toggleGoalModal}/>}
                        </div>
                    </div>
                    <div className='goals-list-group-container'>
                        <ol className="list-group">
                            <li className="list-group-item d-flex align-items-center">
                                <i className="bi bi-bullseye ms-3 uncompleted-goal"></i>
                                <div className="ms-3 me-4 small">
                                    <div className="fw-bold">Save $500</div>
                                    By 5/31
                                </div>
                                <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                    <div className="progress-bar fw-medium" style={{ width: '25%', backgroundColor: "#8f33ff"}}>$125 (25%)</div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="objective-card archived-objectives hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Archived Goals</p>
                        </div>
                    </div>
                    <div className='goals-list-group-container'>
                        <ol className="list-group">
                            <li className="list-group-item d-flex align-items-center">
                                <i className="bi bi-bullseye ms-1 completed-goal"></i>
                                <div className="ms-3 me-4 small">
                                    <div className="fw-bold">Save $500</div>
                                    Completed 5/31
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RenderGoals