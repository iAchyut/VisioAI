import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Define icons and headings for dynamic content
const verticesData = [
  { icon: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/atom.svg", heading: "Electron 1" },
  { icon: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/atom.svg", heading: "Electron 2" },
  { icon: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/atom.svg", heading: "Electron 3" },
  { icon: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/atom.svg", heading: "Electron 4" },
  { icon: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/atom.svg", heading: "Electron 5" },
  { icon: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/svgs/solid/atom.svg", heading: "Electron 6" },
];

const AtomSVG = ({ heading = "Atomic Structure Visualization" }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 500;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2;

    // Set up SVG canvas with a light background
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#f0f0f0") // Light background
      .style("border-radius", "10px")
      .style("box-shadow", "0 4px 10px rgba(0, 0, 0, 0.1)");

    // Create the heading
    svg.append("text")
      .attr("x", centerX)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-family", "Arial, sans-serif")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text(heading);

    // Create the nucleus (center circle)
    svg.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 20)
      .style("fill", "#ff6f61");

    // Define orbits (3 ellipses)
    const orbits = [
      { rx: 150, ry: 70, angle: 0, strokeColor: "#8f8f8f" },
      { rx: 150, ry: 70, angle: 60, strokeColor: "#8f8f8f" },
      { rx: 150, ry: 70, angle: 120, strokeColor: "#8f8f8f" }
    ];

    // Draw the ellipses
    orbits.forEach((orbit) => {
      svg.append("ellipse")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("rx", orbit.rx)
        .attr("ry", orbit.ry)
        .style("fill", "none")
        .style("stroke", orbit.strokeColor)
        .style("stroke-width", "2")
        .style("stroke-dasharray", "5,5")
        .attr("transform", `rotate(${orbit.angle}, ${centerX}, ${centerY})`);
    });

    // Calculate the rotated vertex positions
    const calculateRotatedVertex = (cx, cy, rx, ry, angle, vertexAngle) => {
      const radian = (vertexAngle * Math.PI) / 180;
      const x = cx + rx * Math.cos(radian);
      const y = cy + ry * Math.sin(radian);

      const radianRotation = (angle * Math.PI) / 180;
      const rotatedX = cx + (x - cx) * Math.cos(radianRotation) - (y - cy) * Math.sin(radianRotation);
      const rotatedY = cy + (x - cx) * Math.sin(radianRotation) + (y - cy) * Math.cos(radianRotation);

      return { x: rotatedX, y: rotatedY };
    };

    // Place icons and headings at the vertices of ellipses
    verticesData.forEach((data, index) => {
      const orbitIndex = Math.floor(index / 2);
      const angleIndex = index % 2;
      const orbit = orbits[orbitIndex];
      const angle = angleIndex === 0 ? 0 : 180;

      const { x, y } = calculateRotatedVertex(centerX, centerY, orbit.rx, orbit.ry, orbit.angle, angle);

      svg.append("image")
        .attr("x", x - 15)
        .attr("y", y - 15)
        .attr("width", 30)
        .attr("height", 30)
        .attr("xlink:href", data.icon);

      svg.append("text")
        .attr("x", x + 10)
        .attr("y", y + 5)
        .attr("font-size", "12px")
        .attr("font-family", "Arial, sans-serif")
        .attr("fill", "#333")
        .text(data.heading);
    });
  }, [heading]);

  return <svg ref={svgRef}></svg>;
};

export default AtomSVG;
