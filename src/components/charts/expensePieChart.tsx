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

    const svg = d3.select(svgRef.current).attr('width', width + 200).attr('height', height + 14);

    const radius = Math.min(width - 14, height -14) / 2;
    const arc = d3.arc<d3.PieArcDatum<Datum>>().innerRadius(0).outerRadius(radius);

    const g = svg.append('g').attr('transform', `translate(${width / 2 + 100},${height / 2})`);

    const paths = g
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('data-bs-toggle', 'tooltip')
      .attr('data-bs-title', '32%')
      .attr('data-bs-placement', 'top')
      .attr('data-bs-custom-class', 'custom-tooltip')
      .attr('d', arc)
      .attr('fill', (_, i) => d3.schemeCategory10[i])
      .on('mouseover', function (_, d) {
        this.parentNode.appendChild(this);
        d3.select(this).style('stroke', 'black').style('stroke-width', 2);
        d3.select(`.${d.data.label}`).transition()
          .duration(200)
          .attr('transform', `translate(10, -1)`);
      })
      .on('mouseout', function (_, d) {
        d3.select(this).style('stroke', 'none');
        d3.select(`.${d.data.label}`).transition()
          .duration(200)
          .attr('transform', `translate(5, -1)`);
      });

    var legendG = svg.selectAll(".legend")
      .data(pie(data))
      .enter().append("g")
      .attr('transform', function (d, i) {
        return `translate(${0}, ${i * 20 + 20})`;
      })
      .attr("class", "legend");   
    
    legendG.append("rect")
      .attr("width", 8)
      .attr("height", 8)
      .attr("rx", 50)
      .attr("fill", (_, i) => d3.schemeCategory10[i])
      
    legendG.append("text")
      .text(function(d){
        return d.data.label;
      })
      .attr("y", 10)
      .attr("transform", (d, i) => `translate(5, -1)`)
      .attr('class', (d) => `${d.data.label} small`)
      .attr("x", 11);

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, [data, height, width]);

  return <svg ref={svgRef} />;
};

export default PieChart;


