import React from "react";
import "./TransactionList.css";

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editIndex: -1,
      editedTransaction: null,
    };
  }

  handleEdit = (index, transaction) => {
    this.setState({
      editIndex: index,
      editedTransaction: { ...transaction },
    });
  };

  handleEditChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      editedTransaction: {
        ...prevState.editedTransaction,
        [name]: name === "amount" ? parseFloat(value) : value,
      },
    }));
  };

  handleEditSubmit = (e) => {
    e.preventDefault();
    const { editIndex, editedTransaction } = this.state;
    this.props.onEditTransaction(editIndex, editedTransaction);
    this.setState({ editIndex: -1, editedTransaction: null });
  };

  render() {
    const { transactions, onDeleteTransaction } = this.props;
    const { editIndex, editedTransaction } = this.state;

    return (
      <div className="transaction-list">
        <h3>Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Comment</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        type="date"
                        name="date"
                        value={editedTransaction.date}
                        onChange={this.handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editedTransaction.title}
                        onChange={this.handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="amount"
                        value={editedTransaction.amount}
                        onChange={this.handleEditChange}
                      />
                    </td>
                    <td>
                      <select
                        name="type"
                        value={editedTransaction.type}
                        onChange={this.handleEditChange}
                      >
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="comment"
                        value={editedTransaction.comment}
                        onChange={this.handleEditChange}
                      />
                    </td>
                    <td>
                      <select
                        name="paymentMode"
                        value={editedTransaction.paymentMode}
                        onChange={this.handleEditChange}
                      >
                        <option value="Cash">Cash</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="GPay">GPay</option>
                        <option value="Online Transfer">Online Transfer</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={this.handleEditSubmit}>Save</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{transaction.date}</td>
                    <td>{transaction.title}</td>
                    <td>₹{transaction.amount.toFixed(2)}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.comment}</td>
                    <td>{transaction.paymentMode}</td>
                    <td>
                      <button
                        onClick={() => this.handleEdit(index, transaction)}
                      >
                        Edit
                      </button>
                      <button onClick={() => onDeleteTransaction(index)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TransactionList;
