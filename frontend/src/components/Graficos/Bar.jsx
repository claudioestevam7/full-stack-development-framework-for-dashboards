import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'



const BarChart = ({
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
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[yKey])])
      .range([0, svgWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d[xKey]))
      .range([0, svgHeight])
      .paddingInner(0.1);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(nestedData.keys());

    const legendHeight = 30; // Altura reservada para a legenda

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height + legendHeight) // Aumenta a altura para acomodar a legenda
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Adiciona um retângulo de fundo
    // svg.append('rect').attr('width', svgWidth).attr('height', svgHeight).attr('fill', backgroundColor);

    // Adiciona bordas das barras
    svg
      .selectAll('.bar-border')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-border')
      .attr('x', 0)
      .attr('y', (d) => yScale(d[xKey]) - 1) // Ajuste para a largura da borda
      .attr('width', (d) => xScale(d[yKey]))
      .attr('height', yScale.bandwidth() + 2) // Ajuste para a largura da borda
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .attr('fill', 'none');

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
      .attr('x', 0)
      .attr('y', (d) => yScale(d[xKey]))
      .attr('width', (d) => xScale(d[yKey]))
      .attr('height', yScale.bandwidth());

    // Adicione os ícones ao final de cada barra
    svg.selectAll('.icone')
      .data(data)
      .enter()
      .append('image')
      .attr('class', 'icone')
      .attr('xlink:href', d => d.icone)
      .attr('x', (d) => xScale(d[yKey])+5)  // Ajuste a posição conforme necessário
      .attr('y', (d) => yScale(d[xKey]) + yScale.bandwidth() /2-10)  // Ajuste a posição conforme necessário
      .attr('width', 20)  // Defina a largura do ícone conforme necessário
      .attr('height', 20);  // Defina a altura do ícone conforme necessário

    // Adiciona rótulos no meio das barras
    svg
      .selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => xScale(d[yKey]) / 2)
      .attr('y', (d) => yScale(d[xKey]) + yScale.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '24')
      .attr('fill', 'white')
      .text((d) => d[yKey]);

    


    // Adiciona eixos
    svg.append('g').call(d3.axisLeft(yScale));

    svg.append('g').attr('transform', `translate(0, ${svgHeight})`).call(d3.axisBottom(xScale));

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

export default BarChart