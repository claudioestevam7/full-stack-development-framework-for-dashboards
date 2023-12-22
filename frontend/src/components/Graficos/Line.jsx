import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const MultiLineChart = ({
  data,
  width = 800,
  height = 500,
  margin = { top: 30, right: 30, bottom: 50, left: 50 },
  xKey = 'x',
  yKeys = ['y1', 'y2'],
  lineColors = ['#4CAF50', '#2196F3'],
  lineWidth = 2,
  pointRadius = 5,
  backgroundColor = '#f9f9f9',
  grid = true,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    // Escalas
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d[xKey]), d3.max(data, (d) => d[xKey])])
      .range([0, svgWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d[yKeys[0]], d[yKeys[1]]))])
      .range([svgHeight, 0]);

    // Linhas
    const line = d3.line().x((d) => xScale(d[xKey]));

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Adiciona um retângulo de fundo
    // svg.append('rect').attr('width', svgWidth).attr('height', svgHeight).attr('fill', backgroundColor);

    // Adiciona linhas ao gráfico
    yKeys.forEach((yKey, index) => {
      line.y((d) => yScale(d[yKey]));

      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', lineColors[index])
        .attr('stroke-width', lineWidth)
        .attr('d', line)
        .style('opacity', 0.8);

      // Adiciona pontos ao longo das linhas
      svg
        .selectAll(`.dot-${index}`)
        .data(data)
        .enter()
        .append('circle')
        .attr('class', `dot-${index}`)
        .attr('cx', (d) => xScale(d[xKey]))
        .attr('cy', (d) => yScale(d[yKey]))
        .attr('r', pointRadius)
        .attr('fill', lineColors[index]);
    });

    // Adiciona eixos
    svg.append('g').attr('transform', `translate(0, ${svgHeight})`).call(d3.axisBottom(xScale));

    svg.append('g').call(d3.axisLeft(yScale));

    // Adiciona grade ao gráfico
    // if (grid) {
    //   svg.append('g').attr('class', 'grid').call(d3.axisLeft(yScale).tickSize(-svgWidth).tickFormat(''));
    // }

    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, margin, xKey, yKeys, lineColors, lineWidth, pointRadius, backgroundColor, grid]);

  return <div ref={chartRef}></div>;
};

export default MultiLineChart