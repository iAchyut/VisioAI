import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BalancedScale = ({ leftItems, rightItems, bottomHeading, leftLabel, rightLabel }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 400;
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "linear-gradient(to bottom, #e0f7fa, #80deea)")
      .style("border-radius", "8px");

    // Clear previous content
    svg.selectAll("*").remove();

    const centerX = width / 2;
    const centerY = height / 2;

    // Base rectangle of weighing machine
    svg
      .append("rect")
      .attr("x", centerX - 50)
      .attr("y", centerY + 50)
      .attr("width", 100)
      .attr("height", 20)
      .attr("fill", "#555");

    // Vertical pole
    svg
      .append("rect")
      .attr("x", centerX - 5)
      .attr("y", centerY - 60)
      .attr("width", 10)
      .attr("height", 110)
      .attr("fill", "#555");

    // Horizontal beam
    svg
      .append("rect")
      .attr("x", centerX - 150)
      .attr("y", centerY - 60)
      .attr("width", 300)
      .attr("height", 10)
      .attr("fill", "#555");

    // Left label
    svg
      .append("text")
      .attr("x", centerX - 100)
      .attr("y", centerY - 40)
      .attr("fill", "#333")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .text(leftLabel);

    // Right label
    svg
      .append("text")
      .attr("x", centerX + 100)
      .attr("y", centerY - 40)
      .attr("fill", "#333")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .text(rightLabel);

    // Add items on the left plate (over the hand)
    leftItems.forEach((item, index) => {
      svg
        .append("image")
        .attr("x", centerX - 125)
        .attr("y", centerY - 120 - index * 40)
        .attr("width", 30)
        .attr("height", 30)
        .attr("xlink:href", item.icon);

      svg
        .append("text")
        .attr("x", centerX - 85)
        .attr("y", centerY - 100 - index * 40)
        .attr("fill", "#333")
        .style("font-size", "18px")
        .style("text-anchor", "start")
        .text(item.label);
    });

    // Add items on the right plate (over the hand)
    rightItems.forEach((item, index) => {
      svg
        .append("image")
        .attr("x", centerX + 75)
        .attr("y", centerY - 120 - index * 40)
        .attr("width", 30)
        .attr("height", 30)
        .attr("xlink:href", item.icon);

      svg
        .append("text")
        .attr("x", centerX + 115)
        .attr("y", centerY - 100 - index * 40)
        .attr("fill", "#333")
        .style("font-size", "18px")
        .style("text-anchor", "start")
        .text(item.label);
    });

    // Add bottom heading
    svg
      .append("text")
      .attr("x", centerX)
      .attr("y", centerY + 100)
      .attr("fill", "#333")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .text(bottomHeading);
  }, [leftItems, rightItems, bottomHeading, leftLabel, rightLabel]);

  return <svg ref={svgRef}></svg>;
};

// Usage Example
const leftItems = [
  { label: "Item 1", icon: "https://via.placeholder.com/30" },
  { label: "Item 2", icon: "https://via.placeholder.com/30" },
];

const rightItems = [
  { label: "Item A", icon: "https://via.placeholder.com/30" },
  { label: "Item B", icon: "https://via.placeholder.com/30" },
];

const App = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <BalancedScale 
      leftItems={leftItems} 
      rightItems={rightItems} 
      bottomHeading="Balanced Scale Example" 
      leftLabel="Left Side" 
      rightLabel="Right Side" 
    />
  </div>
);

export default App;
