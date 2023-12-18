import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const ParetoChart = ({ data, width = 800, height = 500, margin = { top: 30, right: 30, bottom: 50, left: 50 } }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    // Ordena os dados em ordem decrescente
    const sortedData = data.slice().sort((a, b) => b.value - a.value);

    // Calcula a soma total dos valores
    const total = d3.sum(data, (d) => d.value);

    // Calcula as percentagens acumuladas
    let cumulativePercentage = 0;
    sortedData.forEach((d) => {
      d.percentage = (d.value / total) * 100;
      cumulativePercentage += d.percentage;
      d.cumulativePercentage = cumulativePercentage;
    });

    // Escalas de cores
    const colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);

    // Escalas
    const xScale = d3.scaleBand().domain(sortedData.map((d) => d.category)).range([0, svgWidth]).padding(0.1);

    const yScaleLeft = d3.scaleLinear().domain([0, total]).range([svgHeight, 0]);
    const yScaleRight = d3.scaleLinear().domain([0, 100]).range([svgHeight, 0]);

    // Cria o contêiner SVG
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Adiciona as barras
    svg
      .selectAll('.bar')
      .data(sortedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.category))
      .attr('y', (d) => yScaleLeft(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => svgHeight - yScaleLeft(d.value))
      .attr('fill', (d, i) => colorScale(i));

    // Adiciona eixos
    svg.append('g').attr('class', 'axisLeft').call(d3.axisLeft(yScaleLeft).ticks(5).tickFormat(d3.format('.0s')));
    svg.append('g').attr('class', 'axisRight').attr('transform', `translate(${svgWidth}, 0)`).call(d3.axisRight(yScaleRight));

    // Adiciona linha de contribuição acumulativa
    const line = d3
      .line()
      .x((d) => xScale(d.category) + xScale.bandwidth() / 2)
      .y((d) => yScaleRight(d.cumulativePercentage));

    svg
      .append('path')
      .datum(sortedData)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#333')
      .attr('stroke-width', 2);

    // Adiciona rótulos
    svg
      .selectAll('.label')
      .data(sortedData)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => xScale(d.category) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScaleRight(d.cumulativePercentage) - 10)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#333')
      .text((d) => `${d.cumulativePercentage.toFixed(1)}%`);

    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, margin]);

  return <div ref={chartRef}></div>;
};



const Pareto = () => {
  const data = [
    { category: 'A', value: 20 },
    { category: 'B', value: 35 },
    { category: 'C', value: 15 },
    { category: 'D', value: 25 },
    { category: 'E', value: 30 },
  ];

  return (
    <div>
      <h2>Pareto Chart Example</h2>
      <ParetoChart data={data} width={800} height={500} margin={{ top: 30, right: 30, bottom: 50, left: 50 }} />
    </div>
  );
}

export default Pareto