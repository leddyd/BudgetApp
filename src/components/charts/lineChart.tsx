import * as React from "react";
import * as d3 from "d3";

interface Data {
  date: Date | null;
  price: number;
}

interface Line {
  name: string;
  color: string;
  values: Data[];
}

function lineChart(svgRef: React.RefObject<SVGSVGElement>) {
  const parseDate = d3.timeParse("%Y-%m");

  const data: Line[] = [
    {
      name: "Savings",
      color: "#32b37d",
      values: [
        { date: "2020-01", price: 0 },
        { date: "2020-02", price: 500 },
        { date: "2020-03", price: 1500 },
        { date: "2020-04", price: 3000 },
        { date: "2020-05", price: 3500 },
        { date: "2020-06", price: 4500 },
        { date: "2020-07", price: 4000 },
        { date: "2020-08", price: 4250 },
        { date: "2020-09", price: 5000 },
        { date: "2020-10", price: 3500 },
        { date: "2020-11", price: 4000 },
        { date: "2020-12", price: 4500 }
      ].map((line) => {
        const date = parseDate(line.date);

        return {
          date: date,
          price: line.price
        };
      })
    },
    {
      name: "Debt",
      color: "#FF5733",
      values: [
        { date: "2020-01", price: 0 },
        { date: "2020-02", price: 400 },
        { date: "2020-03", price: 1200 },
        { date: "2020-04", price: 1700 },
        { date: "2020-05", price: 2100 },
        { date: "2020-06", price: 3500 },
        { date: "2020-07", price: 3000 },
        { date: "2020-08", price: 3250 },
        { date: "2020-09", price: 4500 },
        { date: "2020-10", price: 2200 },
        { date: "2020-11", price: 1300 },
        { date: "2020-12", price: 600 }
      ].map((line) => {
        const date = parseDate(line.date);

        return {
          date: date,
          price: line.price
        };
      })
    }
  ];
  const svg = d3.select(svgRef.current);
  const width = 700;
  const height = 400;
  const margin = 50;
  const duration = 250;

  const lineOpacity = "1";
  const lineOpacityHover = "0.85";
  const otherLinesOpacityHover = "0.1";
  const lineStroke = "3.5";
  const lineStrokeHover = "5";

  const circleOpacity = "0.85";
  const circleOpacityOnLineHover = "0.85";
  const circleRadius = 5;
  const circleRadiusHover = 6;

  /* Scale */
  const [minX, maxX] = d3.extent(data[0].values, (d) => d.date);

  const xScale = d3
    .scaleTime()
    .domain([minX!, maxX!])
    .range([0, width - margin]);

  const [minY, maxY] = d3.extent(data[0].values, (d) => d.price);

  const yScale = d3
    .scaleLinear()
    .domain([minY!, maxY!])
    .range([height - margin, 0]);

  /* Add SVG */
  svg
    .attr("width", width + margin + "px")
    .attr("height", height + margin + "px")
    .attr("class", "line-chart")
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

    const xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickSizeOuter(0)
    .tickFormat(d3.timeFormat("%b"))
    .tickPadding(15);

    const yAxis = d3
    .axisLeft(yScale)
    .tickSize(margin - width)
    .tickSizeOuter(0)
    .ticks(12)
    .tickPadding(20);

  // Add the X Axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(${margin}, ${height})`)
    .attr("font-weight", "100")
    .attr("font-family", '"Roboto", "sans-serif"')
    .call(xAxis)
    .selectAll(".tick line")
    .style("opacity", "0");

  // Add the Y Axis
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("font-weight", "100")
    .attr("font-family", '"Roboto", "sans-serif"')
    .call(yAxis)
    .selectAll(".tick line")
    .style("opacity", "0")
    .append("text")
    .attr("y", 15)
    .attr("transform", "rotate(-90)")

  /* Add line into SVG */
  const line = d3
    .line<Data>()
    .x((d) => xScale(d.date!))
    .y((d) => yScale(d.price))
    .curve(d3.curveBasis);;

  const lines = svg
    .append("g")
    .attr("class", "lines")
    .attr("transform", `translate(${margin}, ${margin})`);

  // draws out line and different points
  lines
    .selectAll("line-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "line-group")
    .on("mouseover", function (_e: MouseEvent, d) {
      svg
        .append("text")
        .attr("class", "title-text")
        .style("fill", d.color)
        .text(d.name)
        .attr("text-anchor", "middle")
        .attr("x", (width - margin) / 2)
        .attr("y", 70);
    })
    .on("mouseout", function (d: Line) {
      svg.select(".title-text").remove();
    })
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.values))
    // line color that connects dots
    .style("stroke", (d) => d.color)
    .style("fill", "none")
    .style("opacity", lineOpacity)
    .on("mouseover", function () {
      d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
      d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
      d3.select(this)
        .style("opacity", lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
    .on("mouseout", function () {
      d3.selectAll(".line").style("opacity", lineOpacity);
      d3.selectAll(".circle").style("opacity", circleOpacity);
      d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
    });
}

const LineChart: React.FunctionComponent = () => {
  const svg = React.useRef<SVGSVGElement>(null);
  React.useEffect(() => {
    lineChart(svg);
  }, [svg]);

  return <svg ref={svg} />;
};

export default LineChart




