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
    const pie = d3.pie<Datum>().value((d) => d.value);
    const arcs = pie(data);

    setArcData(arcs);

    const svg = d3.select(svgRef.current).attr('width', width + 14).attr('height', height + 14);

    const radius = Math.min(width - 14, height -14) / 2;
    const arc = d3.arc<d3.PieArcDatum<Datum>>().innerRadius(0).outerRadius(radius);

    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    const paths = g
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('data-bs-toggle', 'tooltip')
      .attr('data-bs-title', 'Groceries (32%)')
      .attr('data-bs-placement', 'top')
      .attr('data-bs-custom-class', 'custom-tooltip')
      .attr('d', arc)
      .attr('fill', (_, i) => d3.schemeCategory10[i])
      .on('mouseover', function () {
        d3.select(this).style('stroke', 'black').style('stroke-width', 2);
      })
      .on('mouseout', function () {
        d3.select(this).style('stroke', 'none');
      });

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, [data, height, width]);

  return <svg ref={svgRef} />;
};

export default PieChart;


