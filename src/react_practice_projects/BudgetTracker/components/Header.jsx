import classes from "./Header.module.css";

const Header = ({ onClickButton }) => {
  return (
    <header className={classes.header}>
      <h1>Budget Tracker</h1>
      <nav className={classes.nav}>
        <a href="">Months</a>
        <a href="">Years</a>
      </nav>
      <button onClick={onClickButton} type="button">
        + Add Transaction
      </button>
    </header>
  );
};

export default Header;
