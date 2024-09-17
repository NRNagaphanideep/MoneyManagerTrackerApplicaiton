import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "monthly",
      chartData: {
        labels: ["Income", "Expenses"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.updateChartData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.transactions !== this.props.transactions ||
      prevState.filter !== this.state.filter
    ) {
      this.updateChartData();
    }
  }

  updateChartData = () => {
    const filteredTransactions = this.filterTransactions();
    const income = filteredTransactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const expenses = filteredTransactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    this.setState({
      chartData: {
        labels: ["Income", "Expenses"],
        datasets: [
          {
            data: [income, expenses],
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      },
    });
  };

  filterTransactions = () => {
    const { transactions } = this.props;
    const { filter } = this.state;
    const now = new Date();
    const startDate = new Date();

    switch (filter) {
      case "monthly":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "quarterly":
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "yearly":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return transactions;
    }

    return transactions.filter((t) => new Date(t.date) >= startDate);
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { filter, chartData } = this.state;

    return (
      <div className="pie-chart">
        <h3>Financial Overview</h3>
        <div className="filter">
          <label htmlFor="filter">Filter: </label>
          <select id="filter" value={filter} onChange={this.handleFilterChange}>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
      </div>
    );
  }
}

export default PieChart;
