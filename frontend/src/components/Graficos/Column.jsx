import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const ColumnsChart = ({
  data,
  width = 800,
  height = 500,
  margin = { top: 30, right: 30, bottom: 50, left: 50 },
  xKey = 'x',
  yKey = 'y',
  classKey = 'class',
  backgroundColor = '#f9f9f9',
  color='#263665',
  grid = true,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    // Agrupamento dos dados por classe
    const Data = d3.group(data, (d) => d[classKey]);

    // Escalas
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d[xKey]))
      .range([0, svgWidth])
      .paddingInner(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[yKey])])
      .range([svgHeight, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(Data.keys());

    const legendHeight = 0; // Altura reservada para a legenda

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height + legendHeight) // Aumenta a altura para acomodar a legenda
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Adiciona um retângulo de fundo
    // svg.append('rect').attr('width', svgWidth).attr('height', svgHeight).attr('fill', backgroundColor);

    // Adiciona barras ao gráfico
    svg
      .selectAll('.bar-group')
      .data(Data)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('fill', (d) => color)
      .selectAll('rect')
      .data((d) => d[1])
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d[xKey]))
      .attr('y', (d) => yScale(d[yKey]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => svgHeight - yScale(d[yKey]));

    // Adiciona bordas das barras
    svg
      .selectAll('.bar-border')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-border')
      .attr('x', (d) => xScale(d[xKey]) - 1) // Ajuste para a largura da borda
      .attr('y', (d) => yScale(d[yKey]))
      .attr('width', xScale.bandwidth() + 2) // Ajuste para a largura da borda
      .attr('height', (d) => svgHeight - yScale(d[yKey]))
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .attr('fill', 'none');

    // Adiciona rótulos no meio das barras
    svg
      .selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => xScale(d[xKey]) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d[yKey]) + 25) // Ajuste para centralizar verticalmente o rótulo
      .attr('text-anchor', 'middle')
      .attr('font-size', '18')
      .attr('fill', 'white')
      .attr('background-color', 'black')
      .text((d) => d[yKey]);

    // Adiciona eixos
    svg.append('g').attr('transform', `translate(0, ${svgHeight})`).call(d3.axisBottom(xScale));

    svg.append('g').call(d3.axisLeft(yScale))
      .attr('font-size', '12');

    // Adicione a linha vertical no valor x = 20
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', yScale(30))
      .attr('y2', yScale(30))
      .attr('stroke', 'red')
      .attr('stroke-width', 2);

    // Adicione um rótulo para a linha
    svg.append('text')
      .attr('x', width-70)
      .attr('y', yScale(31))  // Ajuste conforme necessário para a posição vertical do rótulo
      .attr('text-anchor', 'middle')  // Alinhamento do texto ao meio
      .attr('fill', 'red')
      .attr('font-size', '20px')
      .text('Meta');  // O texto que você deseja exibir


    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, margin, xKey, yKey, classKey, backgroundColor, grid]);

  return <div ref={chartRef}></div>;
};

export default ColumnsChart