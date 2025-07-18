import { forwardRef, useState } from "react";
import classes from "./ModalAddTransaction.module.css";

const ModalAddTransaction = forwardRef(({ onAdd, categories }, ref) => {
  // Initial state constant
  const initialState = {
    id: "",
    amount: "",
    description: "",
    category: "",
    type: "expense",
    date: "",
  };

  // State
  const [newTransaction, setNewTransaction] = useState(initialState);
  const [isChecked, setIsChecked] = useState(false);

  // Close modal by clicking the "Cancel" button
  const handleCancel = () => {
    // Reset the state of the modal
    setNewTransaction(initialState);
    // Close the modal
    ref.current.close();
  };

  // Close modal by clicking outside the modal
  const handleClickBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      // Reset the state of the modal
      setNewTransaction(initialState);
      // Close the modal
      ref.current.close();
    }
  };

  // Get data from the user's input and process it before adding it to state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => {
      if (name === "amount") {
        return { ...prev, [name]: Number(value) };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  // NOTE: This is the ternary version of the above, it will be quite hard to read once I add more conversions
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewTransaction((prev) => ({
  //     ...prev,
  //     [name]: name === "amount" ? Number(value) : value,
  //   }));
  // };

  // Send the data to App.jsx
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Set custom validation for the description field
    const descriptionField = e.target.elements.description;
    const descriptionValue = descriptionField.value.trim();
    if (descriptionValue === "") {
      descriptionField.setCustomValidity("Please enter a description");
      descriptionField.reportValidity();
      return;
    }
    descriptionField.setCustomValidity("");

    // Set custom validation for the category field
    const categoryField = e.target.elements.category;
    const categoryValue = categoryField.value;
    if (categoryValue === "") {
      categoryField.setCustomValidity("Please choose a category");
      categoryField.reportValidity();
      return;
    }
    categoryField.setCustomValidity("");

    // Add a random ID before sending the data
    const transactionToAdd = { ...newTransaction, id: crypto.randomUUID() };
    onAdd(transactionToAdd);
    console.log(transactionToAdd);
    // Reset the state of the modal
    setNewTransaction(initialState);
    ref.current.close();
  };

  return (
    <dialog className={classes.dialog} ref={ref} onClick={handleClickBackdrop}>
      <h3 className={classes.caption}>Add a new transaction</h3>
      <form method="dialog" onSubmit={handleOnSubmit}>
        <div className={classes.container}>
          <div className={`${classes.form__group} ${classes.toggle__group}`}>
            <label className={classes.toggle}>
              <p>Expense/Income</p>
              <input
                className={classes.toggle__input}
                type="checkbox"
                id="switch"
                hidden
                value={isChecked ? "expense" : "income"}
                name="type"
                onChange={handleChange}
                onClick={() => setIsChecked(!isChecked)}
              />
              <span className={classes.toggle__fill}></span>
            </label>
          </div>
          <div className={classes.form__group}>
            <label htmlFor="amount">Amount (£)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              name="amount"
              id="amount"
              value={newTransaction.amount}
              placeholder="0.00"
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.form__group}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newTransaction.description}
              onChange={handleChange}
              placeholder="Enter a brief description"
            ></textarea>
          </div>

          <div className={classes.form__group}>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={newTransaction.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.form__group}>
            <label htmlFor="category"></label>
            <select
              id="category"
              name="category"
              value={newTransaction.category}
              onChange={handleChange}
            >
              <option key={crypto.randomUUID()} value="">
                -- Category --
              </option>
              {!isChecked
                ? categories.expenses.map((cat) => (
                    <option key={crypto.randomUUID()} value={cat}>
                      {cat}
                    </option>
                  ))
                : categories.incomes.map((cat) => (
                    <option key={crypto.randomUUID()} value={cat}>
                      {cat}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div className={classes.buttons__group}>
          <button className={classes.addButton} type="submit">
            Add
          </button>
          <button
            className={classes.cancelButton}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default ModalAddTransaction;
