import classes from './CategoriesBreakdown.module.css';
import { formatGBP } from '../../utils/formatGBP.js';

const CategoriesBreakdown = ({ categoriesBreakdown }) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.caption}>
            <td>Income categories</td>
          </tr>
        </thead>
        <tbody>
          {categoriesBreakdown
            .filter((obj) => obj.type === 'incomes' && obj.amount > 0)
            .map((obj) => (
              <tr key={obj.category}>
                <td>{obj.category}:</td>
                <td className={classes.amount}>{formatGBP(obj.amount)}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <table className={classes.table}>
        <thead>
          <tr className={classes.caption}>
            <td>Spending categories</td>
          </tr>
        </thead>
        <tbody>
          {categoriesBreakdown
            .filter((obj) => obj.type === 'expenses' && obj.amount > 0)
            .map((obj) => (
              <tr key={obj.category}>
                <td>{obj.category}:</td>
                <td className={classes.amount}>{formatGBP(obj.amount)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesBreakdown;
