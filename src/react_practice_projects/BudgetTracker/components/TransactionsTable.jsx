import classes from './TransactionsTable.module.css';
import { formatGBP } from '../../utils/formatGBP';

const TransactionsTable = ({ transactions, deleteTransaction }) => {
  const sortedTransactions = transactions.sort((a, b) => {
    return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
  });

  return (
    <table className={classes.table}>
      <caption className={classes.caption}>All transactions</caption>
      <thead>
        <tr>
          <th scope="col" className={classes.iconCol}></th>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
          <th scope="col">Category</th>
          <th scope="col" className={classes.colAmount}>
            Amount
          </th>
          <th scope="col" className={classes.iconCol}></th>
        </tr>
      </thead>
      <tbody>
        {sortedTransactions.map((tr) => (
          <tr key={tr.id}>
            <td>
              {tr.type === 'expense' ? (
                <i
                  className="fa-solid fa-circle"
                  style={{ color: 'var(--red-color)' }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-circle"
                  style={{ color: 'var(--green-color)' }}
                ></i>
              )}{' '}
            </td>
            <td>{tr.date}</td>
            <td className={classes.description}>{tr.description}</td>
            <td>{tr.category}</td>

            <td
              className={
                tr.type === 'income'
                  ? `${classes.income} ${classes.colAmount}`
                  : classes.colAmount
              }
            >
              {formatGBP(tr.amount)}
            </td>
            <td>
              {' '}
              <i
                className={`${'fa-solid fa-trash'} ${classes.iconTrash}`}
                onClick={() => deleteTransaction(tr.id)}
              ></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
