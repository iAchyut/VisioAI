import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const HalfPieChart = () => {
    const data = [
        { label: 'Part 1', value: 30 },
        { label: 'Part 2', value: 50 },
        { label: 'Part 3', value: 20 },
      ];
    
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 400;
    const height = 200;
    const radius = Math.min(width, height) / 2;
    
    const svg = d3.select(svgRef.current)
                  .attr('width', width)
                  .attr('height', height)
                  .style('background-color', '#f0f0f0')
                  .style('border-radius', '10px')
                  .style('padding', '20px');

    const g = svg.append('g')
                 .attr('transform', `translate(${width / 2}, ${height / 1.5})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
                  .value(d => d.value)
                  .startAngle(-Math.PI / 2)
                  .endAngle(Math.PI / 2);

    const arc = d3.arc()
                  .outerRadius(radius - 10)
                  .innerRadius(0);

    const sections = g.selectAll('.arc')
                      .data(pie(data))
                      .enter()
                      .append('g')
                      .attr('class', 'arc');

    sections.append('path')
            .attr('d', arc)
            .style('fill', (d, i) => color(i));

    sections.append('text')
            .attr('transform', d => {
              const midAngle = (d.startAngle + d.endAngle) / 2;
              const x = (radius - 20) * Math.cos(midAngle);
              const y = (radius - 20) * Math.sin(midAngle);
              return `translate(${x}, ${y})`;
            })
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .style('fill', '#333')
            .style('font-size', '14px')
            .text(d => d.data.label);

    // Optional: Add small headings beside the pie chart
    sections.append('text')
            .attr('x', 0)
            .attr('y', radius + 15)
            .attr('text-anchor', 'middle')
            .style('fill', '#333')
            .style('font-size', '16px')
            .text((d, i) => `Section ${i + 1}`);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default HalfPieChart;
