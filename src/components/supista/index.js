import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const SupistaDiagram = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions
    const width = 900;
    const height = 600;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background-color", "#f5f5f5")
      .style("font-family", "'Roboto', sans-serif");

    // Center point for the core node
    const centerX = width / 2;
    const centerY = height / 2;

    // Node data for features
    const features = [
      { label: "Sophisticated Grids", x: centerX - 200, y: centerY - 150, color: "#6c63ff" },
      { label: "ROI Analyzer", x: centerX + 200, y: centerY - 150, color: "#42a5f5" },
      { label: "Manage Resources", x: centerX - 200, y: centerY + 150, color: "#00c853" },
      { label: "Billing & Payments", x: centerX + 200, y: centerY + 150, color: "#ff7043" },
    ];

    // Add center node
    svg
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 70)
      .attr("fill", "#37474f")
      .attr("stroke", "#eceff1")
      .attr("stroke-width", 2);

    svg
      .append("text")
      .attr("x", centerX)
      .attr("y", centerY - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill", "#ffffff")
      .text("Supista");

    svg
      .append("text")
      .attr("x", centerX)
      .attr("y", centerY + 20)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#cfd8dc")
      .text("SAS Solution");

    // Draw connecting lines
    features.forEach((feature) => {
      svg
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", feature.x)
        .attr("y2", feature.y)
        .attr("stroke", "#b0bec5")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4,2");
    });

    // Add feature nodes
    features.forEach((feature) => {
      svg
        .append("circle")
        .attr("cx", feature.x)
        .attr("cy", feature.y)
        .attr("r", 50)
        .attr("fill", feature.color)
        .attr("stroke", "#eceff1")
        .attr("stroke-width", 2)
        .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))");

      // Add feature labels
      const words = feature.label.split(" ");
      svg
        .append("text")
        .attr("x", feature.x)
        .attr("y", feature.y - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#ffffff")
        .style("font-weight", "bold")
        .text(words[0]);

      svg
        .append("text")
        .attr("x", feature.x)
        .attr("y", feature.y + 15)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#ffffff")
        .text(words.slice(1).join(" "));
    });

    // Add subtle hover effect
    svg.selectAll("circle").on("mouseover", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 55);
    });

    svg.selectAll("circle").on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 50);
    });
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default SupistaDiagram;
