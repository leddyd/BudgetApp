import React from 'react';
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3';
import ExpenditureBar from './expenditureBar';

const total = 500;

const margin = {
  top: 45,
  right: 150,
  bottom: 70,
  left: 0,
};

const barHeight = 20;
const svgHeight = 113;

class ProgressBar extends React.Component {
  state = {
    data: {
      needs: total * 0.3,
      wants: total * 0.2,
    }
  }

  render(): JSX.Element {
    const parentWidth = 850;
    const { data } = this.state;

    const width = parentWidth - margin.left - margin.right;

    const xScale = scaleLinear()
      .domain([0, total])
      .range([0, width]);

    return (
      <div>
        <svg
          width={width + margin.left + margin.right}
          height={svgHeight}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g className="budget-bar-group">
              <rect x="0" y="0" width={width} height={barHeight} opacity="0.2" />
              <text x="0" y="0" dy="-10" dx="0" className='fw-medium text-muted'>
                ${total - (data.needs + data.wants)} left
              </text>
            </g>
            <ExpenditureBar
              {...{
                xScale,
                barHeight,
                total,
                data,
              }}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default ProgressBar