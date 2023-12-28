import { useState, useEffect } from 'react';
import PieChart from '../charts/expensePieChart';
import ProgressBar from '../charts/progressBar';
import AddTransactionModal from '../modals/add-transaction';
import AddSubscriptionModal from '../modals/add-subscription';
import { getAllMonths, getCurrentMonth } from '../../utils/dateUtils';
import WantsMeter from '../charts/wantsMeter';
import { collection, getDocs, query, DocumentData } from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig.ts';


interface Datum {
    label: string;
    value: number;
}

const data: Datum[] = [
    { label: 'Groceries', value: 30 },
    { label: 'Bills', value: 50 },
    { label: 'Restaurants', value: 20 },
];

export const fetchTransactions = async () => {
    try {

      const userId = auth.currentUser?.uid;

      const transactionsCollection = collection(db, `users/${userId}/transactions`);
      const transactionsQuery = query(transactionsCollection);
  
      const transactionsSnapshot = await getDocs(transactionsQuery);
      const transactionsData = transactionsSnapshot.docs.map((doc) => doc.data());
  
      return transactionsData;
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      return [];
    }
  };
  
  export const fetchSubscriptions = async () => {
    try {

      const userId = auth.currentUser?.uid;

      const subscriptionsCollection = collection(db, `users/${userId}/subscriptions`);
      const subscriptionsQuery = query(subscriptionsCollection);
  
      const subscriptionsSnapshot = await getDocs(subscriptionsQuery);
      const subscriptionsData = subscriptionsSnapshot.docs.map((doc) => doc.data());
  
      return subscriptionsData;
    } catch (error) {
      console.error('Error fetching subscriptions:', error.message);
      return [];
    }
  };

  function RenderExpenses() {
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [displayMonth, setDisplayMonth] = useState(getCurrentMonth);
    const [transactions, setTransactions] = useState<DocumentData[]>([]);
    const [subscriptions, setSubscriptions] = useState<DocumentData[]>([]);
  
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
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const transactionsData = await fetchTransactions();
          const subscriptionsData = await fetchSubscriptions();
          setTransactions(transactionsData);
          setSubscriptions(subscriptionsData);
       } catch (error) {
         console.error('Error fetching data:', error.message);
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
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your balance</p>
                    <h2 className="fw-bold">$530,000.50</h2>
                    <div className="income-spending-container">
                        <div className="income-container">
                            <small className="fw-medium">$500</small>
                            <br />
                            <small className="fw-medium text-muted">Month's Income</small>
                        </div>
                        <div className="spending-container">
                            <small className="fw-medium">$500</small>
                            <br />
                            <small className="fw-medium text-muted">Month's Spending</small>
                        </div>
                    </div>
                </div>
                <div className="progress-container">
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Your budget</p>
                    <ProgressBar />
                </div>
                <div className="meter-container">
                    <WantsMeter />
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
                          <div className="expense-category-indicator"></div>
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
