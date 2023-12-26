import { useState } from 'react';
import PieChart from '../charts/expensePieChart';
import ProgressBar from '../charts/progressBar';
import AddTransactionModal from '../modals/add-transaction';
import AddSubscriptionModal from '../modals/add-subscription';
import { getAllMonths, getCurrentMonth } from '../../utils/dateUtils';

interface Datum {
    label: string;
    value: number;
}

const data: Datum[] = [
    { label: 'Groceries', value: 30 },
    { label: 'Bills', value: 50 },
    { label: 'Restaurants', value: 20 },
];

var transactions = [
    {party: "Dave", date: "12/22", type: "Received", amount:"$50"},
    {party: "Wiseman", date: "12/22", type: "Received", amount:"$50"},
    {party: "Steve", date: "12/22", type: "Sent", amount:"$50"},
    {party: "Bob", date: "12/22", type: "Sent", amount:"$50"},
    {party: "Bill", date: "12/22", type: "Received", amount:"$50"},
];

var subscriptions = [
    {party: "Netflix", date: "Since 8/03", amount:"$10"},
    {party: "Brazzers", date: "Since 8/03", amount:"$12"},
    {party: "Spotify", date: "Since 8/03", amount:"$5"},
    {party: "Xbox", date: "Since 8/03", amount:"$5"},
    {party: "Amazon Prime", date: "Since 8/03", amount:"$15"},
];

function RenderExpenses() {
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [displayMonth, setDisplayMonth] = useState(getCurrentMonth);

    const toggleSubscriptionModal = () => {
        setShowSubscriptionModal(!showSubscriptionModal);
    }

    const toggleTransactionModal = () => {
        setShowTransactionModal(!showTransactionModal);
    };

    const handleMonthChange = (newMonth:string) => {
        setDisplayMonth(newMonth);
    }

    return (
        <div className="app-page-container">
            <div className="header-container hidden">
                <p className='mb-0 fs-4 text-body-emphasis fw-medium text-muted'>This Month's History</p>
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
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Expense Summary</p>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle " href="#" role="button" aria-expanded="false">
                                            {displayMonth}
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            {getAllMonths().map((month) => (
                                                <li><a className="dropdown-item" href="#" onClick={() => handleMonthChange(month)}>{month}</a></li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='chart-container'>
                        <PieChart data={data} width={300} height={300} />
                    </div>
                </div>
                <div className="viz-card expenses hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your Transactions</p>
                            <button type="button" className="btn add-goal-btn" onClick={() => {setShowTransactionModal(!showTransactionModal)}}>
                                <i className="bi bi-plus"></i>
                            </button>
                            {showTransactionModal && <AddTransactionModal onClose={toggleTransactionModal} />}
                        </div>
                    </div>
                    <div className='expenses-list-group-container'>
                        <ol className="list-group">
                            {transactions.map((t) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="expense-category-indicator"></div>
                                    <div className="ms-2 me-auto small">
                                        <div className="fw-bold">{t.party}</div>
                                        {t.date}
                                    </div>
                                    <span className={`badge ${t.type} rounded-pill`}>
                                        <i className={t.type === "Received" ? "bi bi-arrow-down-left-circle-fill" : "bi bi-arrow-up-right-circle-fill"}></i>
                                        {t.type} {t.amount}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="viz-card subscriptions hidden">
                    <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                        <div className="container-fluid">
                            <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Subscriptions</p>
                            <button type="button" className="btn add-goal-btn" onClick={toggleSubscriptionModal}>
                                <i className="bi bi-plus"></i>
                            </button>
                            {showSubscriptionModal && <AddSubscriptionModal onClose={toggleSubscriptionModal} />}
                        </div>
                    </div>
                    <div className='expenses-list-group-container'>
                        <ol className="list-group">
                        {subscriptions.map((s) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="expense-category-indicator"></div>
                                    <div className="ms-2 me-auto small">
                                        <div className="fw-bold">{s.party}</div>
                                        {s.date}
                                    </div>
                                    <span className={"badge Sent rounded-pill"}>
                                        <i className="bi bi-arrow-up-right-circle-fill"></i>
                                        {s.amount} / Month
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            <div className='footer'>
                
            </div>
        </div>
    );
}

export default RenderExpenses;
