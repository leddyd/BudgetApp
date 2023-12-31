import { ScaleLinear, select, transition } from "d3";
import { DocumentData } from "firebase/firestore";
import React, { RefObject } from "react";
import { needs } from "../../utils/constants";

interface ExpenditureBarProps {
  xScale: ScaleLinear<number, number>; 
  barHeight: number; 
  budget: number;
  transactions: DocumentData[];
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
    const { barHeight } = this.props;
    const node = this.ref.current;

    select(node)
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', 0)
      .attr('rx', barHeight / 2)
      .attr('ry', barHeight / 2)
      .attr('width', 0)
      .attr('height', barHeight)
      .attr('fill', '#8f33ff');

    select(node)
      .append('text')
      .attr('class', 'amount fw-medium text-muted')
      .attr('x', 0)
      .attr('y', barHeight)
      .attr('dx', -10)
      .attr('dy', 20);

    this.barTransition();
  }

  barTransition() {
    const { transactions, xScale, budget } = this.props;
    const t = transition().duration(800);
    const total = transactions
    .filter((t) => t.transactionType === "Sent" && !needs.includes(t.category))
    .reduce((n, {amount}) => n + amount, 0);

    select('.bar')
      .transition(t)
      .attr('fill', total > budget ? 'red' : '#8f33ff')
      .attr('width', xScale(Math.min(total, budget)));

    select('.amount')
      .transition(t)
      .attr('x', xScale(Math.min(total, budget)))
      .text(`\$${total} of \$${budget} spent`);
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
