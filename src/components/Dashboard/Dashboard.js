import React from "react";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import TransactionList from "../TransactionList/TransactionList";
import PieChart from "../PieChart/PieChart";
import PDFDownload from "../PDFDownload/PDFDownload";
import { getTransactions, saveTransactions } from "../../utils/localStorage";
import "./Dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      balance: 0,
      income: 0,
      expenses: 0,
      selectedDate: new Date().toISOString().split("T")[0],
    };
  }

  componentDidMount() {
    this.loadTransactions();
  }

  loadTransactions = () => {
    const { currentUser } = this.props;
    const loadedTransactions = getTransactions(currentUser.email);
    this.setState({ transactions: loadedTransactions }, this.calculateBalance);
  };

  calculateBalance = () => {
    const { transactions } = this.state;
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        totalIncome += parseFloat(transaction.amount);
      } else {
        totalExpenses += parseFloat(transaction.amount);
      }
    });

    this.setState({
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses,
    });
  };

  handleAddTransaction = (transaction) => {
    const { currentUser } = this.props;
    const updatedTransactions = [...this.state.transactions, transaction];
    saveTransactions(currentUser.email, updatedTransactions);
    this.setState({ transactions: updatedTransactions }, this.calculateBalance);
  };

  handleDeleteTransaction = (index) => {
    const { currentUser } = this.props;
    const updatedTransactions = this.state.transactions.filter(
      (_, i) => i !== index
    );
    saveTransactions(currentUser.email, updatedTransactions);
    this.setState({ transactions: updatedTransactions }, this.calculateBalance);
  };

  handleEditTransaction = (index, updatedTransaction) => {
    const { currentUser } = this.props;
    const updatedTransactions = [...this.state.transactions];
    updatedTransactions[index] = updatedTransaction;
    saveTransactions(currentUser.email, updatedTransactions);
    this.setState({ transactions: updatedTransactions }, this.calculateBalance);
  };

  handleDateChange = (e) => {
    this.setState({ selectedDate: e.target.value });
  };

  render() {
    const { balance, income, expenses, transactions, selectedDate } =
      this.state;
    const { currentUser, onLogout } = this.props;

    return (
      <div className="dashboard">
        <h1>Welcome, {currentUser.username}!</h1>
        <button onClick={onLogout} className="btn-logout">
          Logout
        </button>
        <div className="balance-summary">
          <h2>Balance Summary</h2>
          <p>Balance: ₹{balance.toFixed(2)}</p>
          <p>Income: ₹{income.toFixed(2)}</p>
          <p>Expenses: ₹{expenses.toFixed(2)}</p>
        </div>
        <div className="date-selector">
          <label htmlFor="date">Select Date: </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>
        <ExpenseForm
          onAddTransaction={this.handleAddTransaction}
          selectedDate={selectedDate}
        />
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={this.handleDeleteTransaction}
          onEditTransaction={this.handleEditTransaction}
        />
        <PieChart transactions={transactions} />
        <PDFDownload transactions={transactions} balance={balance} />
      </div>
    );
  }
}

export default Dashboard;
