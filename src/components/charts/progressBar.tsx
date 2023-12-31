import React from 'react';
import { scaleLinear } from 'd3';
import ExpenditureBar from './expenditureBar';
import { DocumentData } from 'firebase/firestore';

const margin = {
  top: 45,
  right: 0,
  bottom: 70,
  left: 0,
};

const barHeight = 20;
const svgHeight = 113;

interface ProgressBarProps {
  transactions: DocumentData[],
  budget: number;
}

class ProgressBar extends React.Component<ProgressBarProps> {
  getRemaining(): number {
    const { transactions } = this.props;
    return transactions
    .filter((t) => t.transactionType === "Sent")
    .reduce((n, { amount }) => n + amount, 0)
  }

  render(): JSX.Element {
    const parentWidth = 675;
    const width = parentWidth - margin.left - margin.right;
    const {budget, transactions} = this.props;
    const xScale = scaleLinear()
      .domain([0, budget])
      .range([0, width]);

    return (
      <>
        <svg
          width={width + margin.left + margin.right}
          height={svgHeight}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g className="budget-bar-group">
              <rect x="0" y="0" rx={10} ry={10} width={width} height={barHeight} opacity="0.2"/>
              <text x="0" y="0" dy="-10" dx="0" className='fw-medium text-muted'>
                ${budget - this.getRemaining()} left
              </text>
            </g>
            <ExpenditureBar
              {...{
                xScale,
                barHeight,
                budget,
                transactions,
              }}
            />
          </g>
        </svg>
      </>
    );
  }
}

export default ProgressBar