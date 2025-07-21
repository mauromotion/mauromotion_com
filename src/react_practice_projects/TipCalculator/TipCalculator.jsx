import { useState, useEffect } from 'react';
import classes from './TipCalculator.module.css';
import { formatGBP } from '../utils/formatGBP';

const TipCalculator = () => {
  // Set an initial state
  const initialState = { total_bill: '', guests: '', tip: '12.5' };
  const [values, setValues] = useState(initialState);
  const [results, setResults] = useState({
    tip_per_guest: 0,
    total_per_guest: 0,
  });

  // Handle multiple values changes in different inputs based on [name]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle resetting the initial state when clicking on Reset button
  const handleClickReset = () => {
    setValues(initialState);
  };

  // Every time a value changes calculate the tip per guest and the total bill per guest
  useEffect(() => {
    const calculateTipPerGuest = () => {
      if (!values.total_bill || !values.guests) return 0;
      return (values.total_bill * (values.tip / 100)) / values.guests;
    };

    const calculateTotalPerGuest = () => {
      if (!values.total_bill || !values.guests) return 0;
      return values.total_bill / values.guests + calculateTipPerGuest();
    };

    setResults({
      tip_per_guest: formatGBP(calculateTipPerGuest()),
      total_per_guest: formatGBP(calculateTotalPerGuest()),
    });
  }, [values]);

  return (
    <main className={classes.container}>
      <h1>Tip Calculator</h1>
      <form action="submit">
        <label htmlFor="guests">Guests</label>
        <input
          type="number"
          min="1"
          name="guests"
          id="guests"
          placeholder="How many people?"
          value={values.guests ?? ''}
          onChange={handleChange}
        />
        <label htmlFor="bill-amount">Total Bill £</label>
        <input
          type="number"
          min="0"
          step="1"
          name="total_bill"
          id="total_bill"
          placeholder="Enter total bill amount"
          value={values.total_bill ?? ''}
          onChange={handleChange}
        />
        <fieldset>
          <legend>Select a Tip %</legend>
          <div className={classes.radios}>
            <div>
              <input
                type="radio"
                name="tip"
                id="tip"
                value="0"
                onChange={handleChange}
              />
              <label htmlFor="0%">0%</label>
            </div>
            <div>
              <input
                type="radio"
                name="tip"
                id="tip"
                value="10"
                onChange={handleChange}
              />
              <label htmlFor="10%">10%</label>
            </div>
            <div>
              <input
                type="radio"
                name="tip"
                id="tip"
                // defaultValue={"12.5"}
                value="12.5"
                onChange={handleChange}
                checked={values.tip === '12.5'}
              />
              <label htmlFor="12.5%">12.5%</label>
            </div>
            <div>
              <input
                type="radio"
                name="tip"
                id="tip"
                value="15"
                onChange={handleChange}
              />
              <label htmlFor="15%">15%</label>
            </div>
            <div>
              <input
                type="radio"
                name="tip"
                id="tip"
                value="20"
                onChange={handleChange}
              />
              <label htmlFor="20%">20%</label>
            </div>
          </div>
        </fieldset>
      </form>
      <div className={classes.results}>
        <div className={classes.tipTotal}>
          <h3>
            <span>Tip per Guest: </span>
          </h3>
          <span className={classes.tipTotalNum}>{results.tip_per_guest}</span>
        </div>
        <div className={classes.total}>
          <h3>
            <span>Total per Guest: </span>
          </h3>

          <span className={classes.totalNum}>{results.total_per_guest}</span>
        </div>
      </div>

      <div className={classes.buttons}>
        <button type="button" onClick={handleClickReset}>
          Reset
        </button>
      </div>
    </main>
  );
};

export default TipCalculator;
