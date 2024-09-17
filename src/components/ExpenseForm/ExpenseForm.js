import React from "react";
import "./ExpenseForm.css";

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: "",
      type: "Expense",
      comment: "",
      paymentMode: "Cash",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, type, comment, paymentMode } = this.state;
    const { selectedDate } = this.props;

    const newTransaction = {
      title,
      amount: parseFloat(amount),
      type,
      comment,
      paymentMode,
      date: selectedDate,
    };

    this.props.onAddTransaction(newTransaction);
    this.setState({
      title: "",
      amount: "",
      type: "Expense",
      comment: "",
      paymentMode: "Cash",
    });
  };

  render() {
    return (
      <div className="expense-form">
        <h3>Add Transaction</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount (₹):</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="paymentMode">Payment Mode:</label>
            <select
              id="paymentMode"
              name="paymentMode"
              value={this.state.paymentMode}
              onChange={this.handleChange}
            >
              <option value="Cash">Cash</option>
              <option value="PhonePe">PhonePe</option>
              <option value="GPay">GPay</option>
              <option value="Online Transfer">Online Transfer</option>
            </select>
          </div>
          <button type="submit" className="btn-add-transaction">
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
