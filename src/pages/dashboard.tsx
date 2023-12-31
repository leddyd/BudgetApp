import { useState, useEffect } from 'react';
import PieChart from '../components/charts/expensePieChart';
import ProgressBar from '../components/charts/progressBar';
import AddTransactionModal from '../components/modals/add-transaction';
import AddSubscriptionModal from '../components/modals/add-subscription';
import { fetchPlan, fetchSubscriptions, fetchTransactions } from '../utils/fetchData'
import { getAllMonths, getCurrentMonth } from '../utils/dateUtils';
import WantsMeter from '../components/charts/wantsMeter';
import { DocumentData, getDoc } from 'firebase/firestore';
import { colorScale } from '../utils/constants';

function RenderExpenses() {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(getCurrentMonth);
  const [transactions, setTransactions] = useState<DocumentData[]>([]);
  const [plan, setPlan] = useState<DocumentData>();
  const [subscriptions, setSubscriptions] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSubscriptionModal = () => {
    setShowSubscriptionModal(!showSubscriptionModal);
  };

  const toggleTransactionModal = () => {
    setShowTransactionModal(!showTransactionModal);
  };

  const handleMonthChange = (newMonth: string) => {
    setDisplayMonth(newMonth);
  };

  const handleSubscriptionAdded = async () => {
    try{
      console.log('Subscription added. Refreshing subscription data...');
      const newSubscriptionsData = await fetchSubscriptions();
      setSubscriptions(newSubscriptionsData);
    } catch (error) {
      console.error("Error refreshing subscription data");
    }
  };

  const handleTransactionAdded = async () => {
    try {
      console.log('Transaction added. Refreshing transaction data...');
      const newTransactionsData = await fetchTransactions();
      
      setTransactions(newTransactionsData);    
    } catch (error) {
      console.error("Error refreshing transaction data");
    }
  };

  const getBudget = () => {
    const income = transactions
                    .filter((t) => t.transactionType === "Received")
                    .reduce((n, { amount }) => n + amount, 0)
    console.log(Math.trunc((plan?.wants / 100) * income))
    return plan ? Math.trunc((plan.wants / 100) * income) : 0;
  }

  const getBalance = () => {
    const bal = transactions
                  .filter((t) => t.transactionType === "Received")
                  .reduce((n, { amount }) => n + amount, 0)
                -
                transactions
                  .filter((t) => t.transactionType === "Sent")
                  .reduce((n, { amount }) => n + amount, 0)

    return bal >= 0 ? `\$${bal.toFixed(2)}` : `-\$${Math.abs(bal).toFixed(2)}`
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsData = await fetchTransactions();
        const subscriptionsData = await fetchSubscriptions();
        const planRef = await fetchPlan();

        if (planRef) {
          const planSnapshot = await getDoc(planRef);
          if (planSnapshot.exists()) {
            const planData = planSnapshot.data();
            setPlan(planData);
          }
        }

        setTransactions(transactionsData);
        setSubscriptions(subscriptionsData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);
  
  return (
      <div className="app-page-container">
          <div className="header-container hidden">
              <p className='mb-0 fs-4 text-body-emphasis fw-medium text-muted'>This Month's History</p>
          </div>
          <div className="summary-container hidden">
              <div className="balance-container">
                  <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your month's balance</p>
                  <h2 className="fw-bold">{getBalance()}</h2>
                  <div className="income-spending-container">
                      <div className="income-container">
                          <small className="fw-medium">
                            $
                            {transactions.filter((t) => {
                              return t.transactionType === "Received" 
                            }).reduce((n, {amount}) => n + amount, 0)}
                          </small>
                          <br />
                          <small className="fw-medium text-muted">Month's Income</small>
                      </div>
                      <div className="spending-container">
                          <small className="fw-medium">
                            $
                            {transactions.filter((t) => {
                              return t.transactionType === "Sent" 
                            }).reduce((n, {amount}) => n + amount, 0)}
                          </small>
                          <br />
                          <small className="fw-medium text-muted">Month's Spending</small>
                      </div>
                  </div>
              </div>
              <div className="progress-container">
                  <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your budget</p>
                  <ProgressBar budget={getBudget()} transactions={transactions} />
              </div>
              <div className="meter-container">
                {isLoading? (
                  <p></p>
                ) : (
                  <WantsMeter transactions={transactions} />
                )}
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
                                          {getAllMonths().map((month, index) => (
                                              <li key={index}><a className="dropdown-item" href="#" onClick={() => handleMonthChange(month)}>{month}</a></li>
                                          ))}
                                      </ul>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div className='chart-container'>
                      <PieChart data={transactions} width={300} height={300} />
                  </div>
              </div>
              <div className="viz-card expenses hidden">
                <div className='navbar navbar-expand-lg bg-body-tertiary rounded-top-3'>
                  <div className="container-fluid">
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your Transactions</p>
                    <button type="button" className="btn add-goal-btn" onClick={toggleTransactionModal}>
                      <i className="bi bi-plus"></i>
                    </button>
                    {showTransactionModal && <AddTransactionModal onClose={toggleTransactionModal} onTransactionAdded={handleTransactionAdded} />}
                  </div>
                </div>
                <div className='expenses-list-group-container'>
                  <ol className="list-group">
                    {transactions.map((t, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="expense-category-indicator" style={{ backgroundColor: `${colorScale(t.category)}` }}></div>
                        <div className="ms-2 me-auto small">
                          <div className="fw-bold">{t.note}</div>
                          {t.createdAt && t.createdAt.toDate().toLocaleDateString()}
                        </div>
                        <span className={`badge ${t.transactionType} rounded-pill`}>
                          <i className={t.transactionType === "Received" ? "bi bi-arrow-down-left-circle-fill" : "bi bi-arrow-up-right-circle-fill"}></i>
                          {t.transactionType} ${t.amount.toFixed(2)}
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
                          {showSubscriptionModal && <AddSubscriptionModal onClose={toggleSubscriptionModal} onSubscriptionAdded={handleSubscriptionAdded} />}
                      </div>
                  </div>
                  <div className='expenses-list-group-container'>
                      <ol className="list-group">
                      {subscriptions.map((s, index) => (
                              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                  <div className="expense-category-indicator"></div>
                                  <div className="ms-2 me-auto small">
                                      <div className="fw-bold">{s.note}</div>
                                      {s.createdAt && s.createdAt.toDate().toLocaleDateString()}
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
