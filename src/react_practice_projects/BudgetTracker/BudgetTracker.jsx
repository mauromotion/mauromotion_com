//TODO: responsive css
//TODO: write data to pre-fill the app
//TODO: deploy to website
import { useState, useEffect, useRef } from 'react';
import ModalAddTransaction from './components/ModalAddTransaction.jsx';
import Header from './components/Header.jsx';
import TransactionsTable from './components/TransactionsTable.jsx';
import ResultsBanner from './components/ResultsBanner.jsx';
import CategoriesBreakdown from './components/CategoriesBreakdown.jsx';
import '../styles/global.css';
import { initialTransactions } from '../data/initialDataBudgetTracker.js';

const BudgetTracker = () => {
  // Categories
  const categories = {
    incomes: ['Salary', 'Freelancing', 'Sales', 'Gift', 'Other'],
    expenses: [
      'Eating out',
      'Entertainment',
      'Groceries',
      'Rent',
      'Transport',
      'Utilities',
      'Other',
    ],
  };

  // State
  const [transactions, setTransactions] = useState(initialTransactions);

  const [balances, setBalances] = useState({
    currentMonthIncome: 0,
    currentMonthExpenses: 0,
    netBalance: 0,
  });

  const [categoriesBreakdown, setCategoriesBreakdown] = useState([]);

  const dialogRef = useRef();

  // Set up local storage
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (savedTransactions) {
      setTransactions(savedTransactions);
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  // Calculations & Results
  useEffect(() => {
    try {
      const calculateMonthIncome = () =>
        transactions
          .filter((tr) => tr.type === 'income')
          .reduce((sum, tr) => sum + tr.amount, 0);

      const calculateMonthExpenses = () =>
        transactions
          .filter((tr) => tr.type === 'expense')
          .reduce((sum, tr) => sum + tr.amount, 0);

      const calculateNetBalance = () =>
        calculateMonthIncome() - calculateMonthExpenses();

      const calculateCategoriesIncomesBreakdowns = () =>
        categories.incomes.map((cat) => {
          const sum = transactions
            .filter((tr) => tr.category === cat)
            .reduce((sum, tr) => sum + tr.amount, 0);
          return {
            category: cat,
            amount: sum,
            type: 'incomes',
          };
        });

      const calculateCategoriesExpensesBreakdowns = () =>
        categories.expenses.map((cat) => {
          const sum = transactions
            .filter((tr) => tr.category === cat)
            .reduce((sum, tr) => sum + tr.amount, 0);
          return {
            category: cat,
            amount: sum,
            type: 'expenses',
          };
        });

      setBalances({
        currentMonthIncome: calculateMonthIncome(),
        currentMonthExpenses: calculateMonthExpenses(),
        netBalance: calculateNetBalance(),
      });

      setCategoriesBreakdown(
        calculateCategoriesIncomesBreakdowns().concat(
          calculateCategoriesExpensesBreakdowns(),
        ),
      );
    } catch (error) {
      console.error('Error calculating balances', error);
      // Set safe fallback values
      setBalances({
        currentMonthIncome: 0,
        currentMonthExpenses: 0,
        netBalance: 0,
      });
      setCategoriesBreakdown([]);
    }
  }, [transactions]);

  const handleOpenModal = () => {
    dialogRef.current?.showModal();
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const handleDeleteTransaction = (trId) => {
    setTransactions((prev) => prev.filter((obj) => obj.id !== trId));
  };

  return (
    <>
      <ModalAddTransaction
        ref={dialogRef}
        onAdd={handleAddTransaction}
        categories={categories}
      />
      <Header onClickButton={handleOpenModal} />
      <ResultsBanner balances={balances} />
      <CategoriesBreakdown categoriesBreakdown={categoriesBreakdown} />
      <TransactionsTable
        transactions={transactions}
        deleteTransaction={handleDeleteTransaction}
      />
    </>
  );
};

export default BudgetTracker;
