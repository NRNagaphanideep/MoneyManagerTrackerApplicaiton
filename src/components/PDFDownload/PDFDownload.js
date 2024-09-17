import React from "react";
import { generatePDF } from "../../utils/pdfGenerator";
import "./PDFDownload.css";

class PDFDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "daily",
    };
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleDownload = () => {
    const { transactions, balance } = this.props;
    const { filter } = this.state;
    generatePDF(transactions, balance, filter);
  };

  render() {
    const { filter } = this.state;

    return (
      <div className="pdf-download">
        <h3>Download Transactions</h3>
        <div className="filter">
          <label htmlFor="pdfFilter">Filter: </label>
          <select
            id="pdfFilter"
            value={filter}
            onChange={this.handleFilterChange}
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <button onClick={this.handleDownload} className="btn-download">
          Download PDF
        </button>
      </div>
    );
  }
}

export default PDFDownload;
