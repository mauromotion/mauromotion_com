import classes from './ResultsBanner.module.css';
import { formatGBP } from '../../utils/formatGBP';

const ResultsBanner = ({ balances }) => {
  return (
    <div className={classes.recap}>
      <div>
        <h2 className={classes.balanceTitle}>Monthly balance</h2>
        <h2 className={classes.balanceAmountTot}>
          {formatGBP(balances.netBalance)}
        </h2>
      </div>

      <div className={classes.incomesExpenses}>
        <div className={classes.income}>
          <h3 className={classes.balanceTitleSmall}>Income</h3>
          <h3 className={`${classes.balanceAmount} ${classes.balanceIn}`}>
            {formatGBP(balances.currentMonthIncome)}
          </h3>
        </div>

        <div className={classes.expenses}>
          <h3 className={classes.balanceTitleSmall}>Expenses</h3>
          <h3 className={`${classes.balanceAmount} ${classes.balanceOut}`}>
            {formatGBP(balances.currentMonthExpenses)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ResultsBanner;
