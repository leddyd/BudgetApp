import React, { RefObject, Component } from 'react';
import { PieArcDatum, select } from 'd3';
import * as d3 from 'd3';
import { DocumentData } from 'firebase/firestore';
import { needs } from '../../utils/constants';

interface DataEntry {
    key: string;
    value: number;
}

interface WantsMeterProps {
    transactions: DocumentData[];
}

interface WantsMeterState {
    total: number;
    categories: {
      wants: number;
      needs: number;
    };
}

export default class WantsMeter extends Component<WantsMeterProps, WantsMeterState> {
    private ref: RefObject<SVGGElement>;

    constructor(props: WantsMeterProps) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            total: props.transactions.reduce((n, { amount }) => n + amount, 0),
            categories: {
              wants: props.transactions
                .filter((t) => !needs.includes(t.category))
                .reduce((n, { amount }) => n + amount, 0),
              needs: props.transactions
                .filter((t) => needs.includes(t.category))
                .reduce((n, { amount }) => n + amount, 0),
            },
        };
    }

    componentDidMount() {
        this.build();
    }

    componentDidUpdate() {
        this.build();
    }

    private setupChart() {
        const width = 200;
        const height = 200;
        const margin = 5;
        const radius = Math.min(width, height) / 2 - margin;
        const node = this.ref.current;

        select(node)
            .attr("width", width)
            .attr("height", height)
            .attr("transform", `translate(${width / 2}, ${height / 1.75})`);

        const color: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal<string>()
            .domain(Object.keys(this.state.categories))
            .range(["#FF7F0E", "#8F33FF"]);

        const pie = d3.pie<DataEntry>()
            .startAngle(-Math.PI / 2)
            .endAngle(Math.PI / 2)
            .value((d: DataEntry) => d.value).sort(null);

        const data_entries: DataEntry[] = Object.entries(this.state.categories).map(([key, value]) => ({ key, value })) as DataEntry[];
        const data_ready = pie(data_entries);

        const arcGenerator = d3.arc<d3.PieArcDatum<DataEntry>>()
            .innerRadius(radius / 2)
            .outerRadius(radius);

        return { node, color, data_ready, arcGenerator };
    }

    build() {
        const { node, color, data_ready, arcGenerator } = this.setupChart();
    
        select(node)
        .selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('fill', (d) => d.data.key == "wants" ? '#8F33FF' : '#CCCCCC')
        .style("stroke", 'white')
        .style("stroke-width", "3px")
        .attr('d', arcGenerator)

        select(node)
        .append('text')
        .attr('class', 'fw-medium text-muted')
        .attr('text-anchor', 'middle')
        .attr('dy', '0')
        .style('font-size', '20px') 
        .text(`${Math.trunc((this.state.categories.wants / this.state.total)*100)}%`);

        select(node)
        .append('text')
        .attr('class', 'text-muted small')
        .style('text-rendering', 'optimizeLegibility')
        .attr('text-anchor', 'middle')
        .attr('dy', '2em')
        .style('font-size', '14px')
        .text("of your expenses are wants");
    }
    
    _changeState = (newState: WantsMeterState) => {
        this.setState(newState);
    }

    render() {
        return (
            <svg
                width={200}
                height={200}
                className="meter-svg"
            >
                <g ref={this.ref} className="wants-meter-group" />
            </svg>
        )
    }
}
