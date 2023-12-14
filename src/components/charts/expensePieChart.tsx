import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Datum {
  label: string;
  value: number;
}

interface PieChartProps {
  data: Datum[];
  width: number;
  height: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [arcData, setArcData] = useState<d3.PieArcDatum<Datum>[]>([]);

  useEffect(() => {
    const pie = d3.pie<Datum>().value(d => d.value);
    const arcs = pie(data);

    setArcData(arcs);

    const svg = d3.select(svgRef.current);

    // Create arcs
    const arc = d3.arc<d3.PieArcDatum<Datum>>().innerRadius(0).outerRadius(Math.min(width, height) / 2);

    // Append arcs to the SVG
    svg
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (_, i) => d3.schemeCategory10[i])
      .attr('transform', `translate(${width / 2},${height / 2})`);
  }, [data, height, width]);

  return <svg ref={svgRef} width={width} height={height}/>;
};

export default PieChart;
