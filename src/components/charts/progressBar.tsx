import React, {Component} from 'react';
import { scaleLinear } from 'd3';
import ExpenditureBar from './expenditureBar';
import { render } from 'react-dom';

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
    data: total * .5,
  }

  render() {
    const parentWidth = 600;
    const { data } = this.state;

    const width = parentWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

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
              <rect x="0" y="0" width={width} height={barHeight} rx={`${barHeight / 2}`} ry={`${barHeight / 2}`} opacity="0.2" />
              <text x="0" y="0" dy="-10" dx="0" className='fw-medium text-muted'>
                ${total - data} left 
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