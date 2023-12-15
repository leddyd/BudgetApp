import { useState } from "react";

function RenderGoals() {
    const [debtValue, setDebtValue] = useState(25);
    const [savingsValue, setSavingsValue] = useState(25);
    const [needsValue, setNeedsValue] = useState(25);
    const [wantsValue, setWantsValue] = useState(25);

    const recalculateSliders = (changedSlider: 'debt' | 'savings' | 'needs' | 'wants', newValue: number, oldValue: number) => {
        let magnitude = (oldValue - newValue) / 3;
    
        switch (changedSlider) {
            case 'debt':
                setSavingsValue(Math.min(Math.max(savingsValue + magnitude, 0), 100));
                setNeedsValue(Math.min(Math.max(needsValue + magnitude, 0), 100));
                setWantsValue(Math.min(Math.max(wantsValue + magnitude, 0), 100));
                break;
            case 'savings':
                setDebtValue(Math.min(Math.max(debtValue + magnitude, 0), 100));
                setNeedsValue(Math.min(Math.max(needsValue + magnitude, 0), 100));
                setWantsValue(Math.min(Math.max(wantsValue + magnitude, 0), 100));
                break;
            case 'needs':
                setDebtValue(Math.min(Math.max(debtValue + magnitude, 0), 100));
                setSavingsValue(Math.min(Math.max(savingsValue + magnitude, 0), 100));
                setWantsValue(Math.min(Math.max(wantsValue + magnitude, 0), 100));
                break;
            case 'wants':
                setDebtValue(Math.min(Math.max(debtValue + magnitude, 0), 100));
                setNeedsValue(Math.min(Math.max(needsValue + magnitude, 0), 100));
                setSavingsValue(Math.min(Math.max(savingsValue + magnitude, 0), 100));
                break;
            default:
                break;
            }
        }
    
      const handleDebtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const oldValue = debtValue;
        const newValue = parseInt(e.target.value, 10);
        setDebtValue(newValue);
        recalculateSliders('debt', newValue, oldValue);
      };
    
      const handleSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const oldValue = savingsValue;
        const newValue = parseInt(e.target.value, 10);
        setSavingsValue(newValue);
        recalculateSliders('savings', newValue, oldValue);
      };
    
      const handleNeedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const oldValue = needsValue;
        const newValue = parseInt(e.target.value, 10);
        setNeedsValue(newValue);
        recalculateSliders('needs', newValue, oldValue);
      };

      const handleWantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const oldValue = wantsValue;
        const newValue = parseInt(e.target.value, 10);
        setWantsValue(newValue);
        recalculateSliders('wants', newValue, oldValue);
      };

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
                        <label htmlFor="income-field" className="form-label">After-Tax Monthly Income</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" id="income-field"/>
                            <span className="input-group-text">.00</span>
                        </div>
                        <label htmlFor="debt-slider" className="form-label">
                            Debt
                            <span className="slider-value">{Math.trunc(debtValue)}%</span>
                        </label>
                        <input type="range" className="form-range" step="1" id="debt-slider" value={debtValue} onChange={handleDebtChange}></input>
                        <label htmlFor="savings-slider" className="form-label">
                            Savings
                            <span className="slider-value">{Math.trunc(savingsValue)}%</span>
                        </label>
                        <input type="range" className="form-range" step="1" id="savings-slider" value={savingsValue} onChange={handleSavingsChange}></input>
                        <label htmlFor="needs-slider" className="form-label">
                            Needs
                            <span className="slider-value">{Math.trunc(needsValue)}%</span>
                        </label>
                        <input type="range" className="form-range" step="1" id="needs-slider" value={needsValue} onChange={handleNeedsChange}></input>
                        <label htmlFor="wants-slider" className="form-label">
                            Wants
                            <span className="slider-value">{Math.trunc(wantsValue)}%</span>
                        </label>
                        <input type="range" className="form-range" step="1" id="wants-slider" value={wantsValue} onChange={handleWantsChange}></input>
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