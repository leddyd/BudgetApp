import * as d3 from 'd3';
import { PieArcDatum, select } from 'd3';
import React, { RefObject } from 'react';
import { Component } from 'react';

interface DataEntry {
    key: string;
    value: number;
}

export default class WantsMeter extends Component<{}> {
    private ref: RefObject<SVGGElement>;

    constructor(props: {}) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.init();
    }
    
    componentDidUpdate() {
        this.transition();
    }

    init() {
        const width = 200; 
        const height = 200; 
        const margin = 5;
        const radius = Math.min(width, height) / 2 - margin;
        const data: { [key: string]: number } = {
            key1: 10,
            key2: 20,
            key3: 30,
          };
        const node = this.ref.current;

        select(node)
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const color: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal<string>()
        .domain(Object.keys(data))
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

        const pie = d3.pie<DataEntry>()
        .startAngle(-Math.PI / 2) 
        .endAngle(Math.PI / 2)
        .value((d: DataEntry) => d.value);

        const data_entries: DataEntry[] = Object.entries(data).map(([key, value]) => ({ key, value }));
        const data_ready = pie(data_entries);

        const arcGenerator = d3.arc<PieArcDatum<DataEntry>>()
        .innerRadius(radius / 2) // This is the size of the donut hole
        .outerRadius(radius);

        select(node)
        .selectAll('whatever')
        .data(data_ready)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', (d: PieArcDatum<DataEntry>) => color(d.data.key))
        .attr("stroke", "white")
        .style("stroke-width", "4px")
        .style("opacity", 1)
    }

    transition() {

    }

    render() {
        return (
            <svg 
                width={200}
                height={200}
                className="meter-svg"
            >
                <g ref={this.ref} className="wants-meter-group"/>
            </svg> 
        )
    }
}