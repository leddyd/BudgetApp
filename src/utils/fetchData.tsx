import { collection, getDocs, query, DocumentData, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig.ts';

export const fetchTransactions = async (): Promise<DocumentData[]> => {
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
  
export const fetchSubscriptions = async (): Promise<DocumentData[]> => {
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

export const fetchGoals = async (): Promise<DocumentData[]> => {
    try {

      const userId = auth.currentUser?.uid;

      const goalsCollection = collection(db, `users/${userId}/goals`);
      const goalsQuery = query(goalsCollection);
  
      const goalsSnapshot = await getDocs(goalsQuery);
      const goalsData = goalsSnapshot.docs.map((doc) => doc.data());
  
      return goalsData;
    } catch (error) {
      console.error('Error fetching goals:', error.message);
      return [];
    }
  };

export const fetchUserInfo = async (): Promise<DocumentData | null> => {
    try {
      const userId = auth.currentUser?.uid;
  
      const infoCollection = collection(db, `users/${userId}/info`);
      const infoDoc = doc(infoCollection, 'userInfo');
  
      const infoSnapshot = await getDoc(infoDoc);
  
      if (infoSnapshot.exists()) {
        return infoSnapshot.data();
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching user info:', error.message);
      return [];
    }
  };