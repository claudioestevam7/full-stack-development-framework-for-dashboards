import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'



const BarChart = ({
  data,
  meta,
  width = 800,
  height = 500,
  margin = { top: 50, right: 30, bottom: 50, left: 50 },
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
      .paddingInner(0.02);


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
      .attr('height', yScale.bandwidth() - 15 + 2) // Ajuste para a largura da borda
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
      .attr('height', yScale.bandwidth() - 15);

    // Adicione os ícones ao final de cada barra
    svg.selectAll('.icone')
      .data(data)
      .enter()
      .append('image')
      .attr('class', 'icone')
      .attr('xlink:href', d => d.icone)
      .attr('x', (d) => xScale(d[yKey]) + 2)  // Ajuste a posição conforme necessário
      .attr('y', (d) => yScale(d[xKey]) + yScale.bandwidth() / 2 -15)  // Ajuste a posição conforme necessário
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
      .attr('y', (d) => yScale(d[xKey]) + yScale.bandwidth() / 2 - 5)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '18')
      .attr('fill', 'white')
      .text((d) => d[yKey]);


    // Adicione a linha vertical no valor da meta
    svg.append('line')
      .attr('x1', xScale(meta))
      .attr('x2', xScale(meta))
      .attr('y1', yScale(data[0].x) -50)
      .attr('y2', yScale(data[data.length-1].x) +30)
      .attr('stroke', 'red')
      .attr('stroke-width', 2);

    // Adicione um rótulo para a linha
    svg.append('text')
      .attr('x', -20)
      .attr('y', -xScale(meta) - 10)  // Ajuste conforme necessário para a posição vertical do rótulo
      .attr('text-anchor', 'middle')  // Alinhamento do texto ao meio
      .attr('fill', 'red')
      .attr('transform', 'rotate(90)')
      .text('Meta');  // O texto que você deseja exibir



    // Adiciona eixos
    svg.append('g').call(d3.axisLeft(yScale));

    svg.append('g').attr('transform', `translate(0, ${svgHeight})`).call(d3.axisBottom(xScale));






    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, margin, xKey, yKey, classKey, backgroundColor, grid]);

  return <div ref={chartRef}></div>;
};

export default BarChart