import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const DobleDonnuts = ({
  data,
  data2,
  data3,
  width = 400,
  height = 400,
  radius = Math.min(width, height) / 2,
  innerRadius = 0,
  cornerRadius = 0,
  padAngle = 0.01,
  borderWidth = 2, 
  borderColor = '#fff',
  backgroundColor = 'transparent',
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Cores para as fatias
    const colors = d3.scaleOrdinal(['#e5231b','#fad3d1']);
    const colors2 = d3.scaleOrdinal(['#405aa8','#d9deee']);
    const colors3 = d3.scaleOrdinal(['#595c63','#dedee0']);

    // Função para gerar o layout do gráfico de pizza
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    // Arc generator para as fatias
    const arc = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(innerRadius + 125)
      .cornerRadius(cornerRadius);

    const arc2 = d3
      .arc()
      .outerRadius(radius - 25)
      .innerRadius(innerRadius + 100)
      .cornerRadius(cornerRadius);

    const arc3 = d3
      .arc()
      .outerRadius(radius - 50)
      .innerRadius(innerRadius + 75)
      .cornerRadius(cornerRadius);

    // SVG
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Adiciona um círculo de fundo (opcional)
    // svg.append('circle').attr('r', radius).attr('fill', backgroundColor);

    // Criação das fatias
    const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g');
    const arcs2 = svg.selectAll('arc2').data(pie(data2)).enter().append('g');
    const arcs3 = svg.selectAll('arc3').data(pie(data3)).enter().append('g');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors(i))
      .attr('stroke', borderColor)
      .style('stroke-width', `${borderWidth}px`);

    arcs2
      .append('path')
      .attr('d', arc2)
      .attr('fill', (d, i) => colors2(i))
      .attr('stroke', borderColor)
      .style('stroke-width', `${borderWidth}px`);

    arcs3
      .append('path')
      .attr('d', arc3)
      .attr('fill', (d, i) => colors3(i))
      .attr('stroke', borderColor)
      .style('stroke-width', `${borderWidth}px`);


    arcs
    .append('text')
    .attr('trasform', (d) => `translate(${arc.centroid(d)})`)
    .text('87%')
    .attr('font-size', '55')
    .attr('font-weght', 5)
    .style('text-anchor', 'middle');


    // Adiciona rótulos nas fatias
    // arcs
    //   .append('text')
    //   .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    //   .attr('dy', '0.35em')
    //   .text((d) => d.data.label)
    //   .style('text-anchor', 'middle');



    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, radius, innerRadius, cornerRadius, padAngle, borderWidth, borderColor, backgroundColor]);

  return <div ref={chartRef}></div>;
};


export default DobleDonnuts