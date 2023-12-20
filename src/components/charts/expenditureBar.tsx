import { ScaleLinear, select, transition } from "d3";
import React, { RefObject } from "react";

interface ExpenditureBarProps {
  xScale: ScaleLinear<number, number>; 
  barHeight: number; 
  total: number;
  data: { [key: string]: number };
}

class ExpenditureBar extends React.Component<ExpenditureBarProps> {
  private ref: RefObject<SVGGElement>;

  constructor(props: ExpenditureBarProps) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    this.barTransition();
  }

  init() {
    const { xScale, barHeight } = this.props;
    const node = this.ref.current;

    let xPos = 0;
    Object.keys(this.props.data).forEach((category) => {
      select(node)
        .append('rect')
        .attr('class', `bar-${category}`)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 0)
        .attr('height', barHeight)
        .attr('fill', category === 'needs' ? 'blue' : 'green');
      xPos += xScale(this.props.data[category]);
    });

    select(node)
        .append('text')
        .attr('class', `amount-left fw-medium text-muted`)
        .attr('x', 0)
        .attr('y', barHeight)
        .attr('dx', -10)
        .attr('dy', 20);

    this.barTransition();
  }

  barTransition() {
    const { xScale, total, data } = this.props;
    const t = transition().duration(800);
    const sortedCategories = Object.keys(data).sort((a, b) => data[a] - data[b]);

    let spentWidth = 0;
    sortedCategories.forEach((category) => {
      select(`.bar-${category}`)
        .transition(t)
        .attr('fill', data[category] > total ? 'red' : (category === 'needs' ? 'blue' : 'green'))
        .attr('width', xScale(Math.min(data[category] + spentWidth, total)));

      spentWidth += data[category];
    });

    select(`.amount-left`)
        .transition(t)
        .attr('x', xScale(Math.min(spentWidth, total)))
        .text(`\$${spentWidth} of \$${total} spent`);
  }

  render() {
    return (
      <g
        ref={this.ref}
        className="expenditure-bar-group"
      />
    );
  }
}

export default ExpenditureBar;

