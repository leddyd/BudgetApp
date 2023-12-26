import React from 'react';
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3';
import ExpenditureBar from './expenditureBar';

const budget = 500;

const margin = {
  top: 45,
  right: 0,
  bottom: 70,
  left: 0,
};

const barHeight = 20;
const svgHeight = 113;

class ProgressBar extends React.Component {
  state = {
    data: {
      needs: 50,
      wants: 25,
    }
  }

  render(): JSX.Element {
    const parentWidth = 675;
    const { data } = this.state;

    const width = parentWidth - margin.left - margin.right;

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
                ${budget - (data.needs + data.wants)} left
              </text>
            </g>
            <ExpenditureBar
              {...{
                xScale,
                barHeight,
                budget,
                data,
              }}
            />
          </g>
        </svg>
      </>
    );
  }
}

export default ProgressBar