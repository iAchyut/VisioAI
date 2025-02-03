import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PrismSplitSVG = ({ overallHeading, incomingHeading, outgoingHeading, outlineHeadings, lines }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 600;
    const prismSize = 100;
    const outputLines = lines;

    // Create SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'linear-gradient(to bottom right, #102a43, #243b55)');

    // Define prism coordinates
    const prismX = width / 2;
    const prismY = height / 2;
    const prismPoints = [
      [prismX - prismSize / 2, prismY + prismSize / 2], // Bottom-left
      [prismX + prismSize / 2, prismY + prismSize / 2], // Bottom-right
      [prismX, prismY - prismSize / 2],                // Top
    ];

    // Draw the incoming line
    svg.append('line')
      .attr('x1', prismX - 200)
      .attr('y1', prismY)
      .attr('x2', prismX - prismSize / 2)
      .attr('y2', prismY)
      .attr('stroke', '#e0f7fa')
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', '5,5');

    // Draw the prism (triangle)
    svg.append('polygon')
      .attr('points', prismPoints.map(p => p.join(',')).join(' '))
      .attr('fill', '#ffd700')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 3);

    // Calculate angles for output lines
    const angleStep = 60 / (outputLines - 1);
    const startAngle = -30; // Spread lines symmetrically from -30 to 30 degrees

    // Draw the outgoing lines and labels
    for (let i = 0; i < outputLines; i++) {
      const angle = startAngle + i * angleStep;
      const x2 = prismX + 200 * Math.cos((angle * Math.PI) / 180);
      const y2 = prismY + 200 * Math.sin((angle * Math.PI) / 180);

      // Draw outgoing line
      svg.append('line')
        .attr('x1', prismX + prismSize / 2)
        .attr('y1', prismY)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', d3.interpolateRainbow(i / outputLines))
        .attr('stroke-width', 3);

      // Add dynamic heading for each outgoing line
      svg.append('text')
        .attr('x', x2 + (x2 > prismX ? 10 : -10)) // Adjust position based on direction
        .attr('y', y2)
        .attr('text-anchor', x2 > prismX ? 'start' : 'end')
        .attr('fill', '#e0f7fa')
        .attr('font-size', '12px')
        .text(outlineHeadings[i] || `Line ${i + 1}`); // Default to "Line X" if no heading provided
    }

    // Add overall heading
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .text(overallHeading);

    // Add labels for incoming and outgoing light
    svg.append('text')
      .attr('x', prismX - 220)
      .attr('y', prismY - 20)
      .attr('fill', '#e0f7fa')
      .attr('font-size', '16px')
      .attr('font-style', 'italic')
      .text(incomingHeading);

    svg.append('text')
      .attr('x', prismX + 120)
      .attr('y', prismY + prismSize / 2 + 40)
      .attr('fill', '#e0f7fa')
      .attr('font-size', '16px')
      .attr('font-style', 'italic')
      .text(outgoingHeading);
  }, [overallHeading, incomingHeading, outgoingHeading, outlineHeadings]);

  return <svg ref={svgRef}></svg>;
};

export default PrismSplitSVG;
