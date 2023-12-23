import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({
  data,
  width = 400,
  height = 400,
  radius = Math.min(width, height) / 2,
  innerRadius = 0,
  cornerRadius = 0,
  padAngle = 0.01,
  borderWidth = 2,
  borderColor = '#fff',
  backgroundColor = 'transparent',
  palette = d3.schemeCategory10
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Cores para as fatias
    const colors = d3.scaleOrdinal(palette);
    // Função para gerar o layout do gráfico de pizza

    const legendHeight = 10; // Altura reservada para a legenda

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort((a, b) => b.value - a.value);

    // Arc generator para as fatias
    const arc = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .cornerRadius(cornerRadius);

    // SVG
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2 - 10})`);

    // Adiciona um círculo de fundo (opcional)
    svg.append('circle').attr('r', radius).attr('fill', backgroundColor);


    // //  Adiciona o tirulo do grafico
    // svg.append('text')
    //   .text(title)
    //   .attr('font-weight','semibold')
    //   .attr('transform', `translate(${-width/2+10},${-height / 2 + 40})`);

    // Criação das fatias
    const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g');




    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => (colors(i)))
      .attr('stroke', borderColor)
      .style('stroke-width', `${borderWidth}px`);



    // Adiciona rótulos nas fatias
    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d) => `${d.data.value}`)
      .attr('font-size', '18')
      .attr('fill', 'white')
      .style('text-anchor', 'middle');


    // Adiciona legenda abaixo do gráfico
    const legend = svg
      .selectAll('.legend')
      .data(colors.domain())
      .enter()
      .append('g')
      .attr('d', 'legend')
      .attr('transform', (d, i) => `translate(${i * 90 - 100}, ${height - 170})`); // Posicionamento abaixo do gráfico

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', colors);

    legend
      .append('text')
      .attr('width', 18)
      .attr('height', 18)
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '0.35em')
      .text(d => data[d].label)
      .attr('fill', 'black');


    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, radius, innerRadius, cornerRadius, padAngle, borderWidth, borderColor, backgroundColor]);

  return <div ref={chartRef}></div>;
};




export default PieChart