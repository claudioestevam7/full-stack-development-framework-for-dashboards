import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const MultiClassBarChart = ({
  data,
  width = 800,
  height = 500,
  margin = { top: 30, right: 30, bottom: 50, left: 50 },
  xKey = 'x',
  yKey = 'y',
  classKey = 'class',
  backgroundColor = '#f9f9f9',
  grid = true,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    // Agrupamento dos dados por classe
    const nestedData = d3.group(data, (d) => d[classKey]);

    // Escalas
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d[xKey]))
      .range([0, svgWidth])
      .paddingInner(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[yKey])])
      .range([svgHeight, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(nestedData.keys());

    const legendHeight = 60; // Altura reservada para a legenda

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
      .data(nestedData)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('fill', (d) => colorScale(d[0]))
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
      .attr('font-size','24')
      .attr('fill', 'white')
      .attr('background-color','black')
      .text((d) => d[yKey]);

    // Adiciona eixos
    svg.append('g').attr('transform', `translate(0, ${svgHeight})`).call(d3.axisBottom(xScale));

    svg.append('g').call(d3.axisLeft(yScale))
    .attr('font-size','24');

    // Adiciona grade ao gráfico
    // if (grid) {
    //   svg.append('g').attr('class', 'grid').call(d3.axisLeft(yScale).tickSize(-svgWidth).tickFormat(''));
    // }

    // Adiciona legenda abaixo do gráfico
    const legend = svg
      .selectAll('.legend')
      .data(colorScale.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${i * 80}, ${svgHeight + legendHeight / 2})`); // Posicionamento abaixo do gráfico

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', colorScale);

    legend
      .append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text((d) => d);

    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, margin, xKey, yKey, classKey, backgroundColor, grid]);

  return <div ref={chartRef}></div>;
};

const Column = () => {

  const data = [
    { x: 'Categoria 1', y: 30, class: 'A' },
    { x: 'Categoria 2', y: 50, class: 'B' },
    { x: 'Categoria 3', y: 20, class: 'A' },
    { x: 'Categoria 4', y: 70, class: 'C' },
  ];

  return (
    <div>
      <h1 className='font-bold'>Gráfico de Barras com Múltiplas Classes</h1>
      <MultiClassBarChart
        data={data}
        width={800}
        height={500}
        margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
        xKey="x"
        yKey="y"
        classKey="class"
        backgroundColor="#f9f9f9"
        grid={true}
      />
    </div>
  );
}

export default Column