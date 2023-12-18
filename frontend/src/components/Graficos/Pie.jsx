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
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Cores para as fatias
    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    // Função para gerar o layout do gráfico de pizza
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

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
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Adiciona um círculo de fundo (opcional)
    svg.append('circle').attr('r', radius).attr('fill', backgroundColor);

    // Criação das fatias
    const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors(i))
      .attr('stroke', borderColor)
      .style('stroke-width', `${borderWidth}px`);

    // Adiciona rótulos nas fatias
    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d) => d.data.label)
      .style('text-anchor', 'middle');

    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, radius, innerRadius, cornerRadius, padAngle, borderWidth, borderColor, backgroundColor]);

  return <div ref={chartRef}></div>;
};




const Pie = () => {
    const data = [
      { label: 'Categoria 1', value: 30 },
      { label: 'Categoria 2', value: 50 },
      { label: 'Categoria 3', value: 20 },
      { label: 'Categoria 4', value: 30 },
    ];
  return (
    <div>
      <h1 className='font-bold'>Gráfico de Pizza</h1>
      <PieChart
        data={data}
        width={400}
        height={400}
        radius={200}
        innerRadius={50}
        cornerRadius={10}
        padAngle={0.02}
        borderWidth={3}
        borderColor="#fff"
        backgroundColor="#f0f0f0"
      />
    </div>
  )
}

export default Pie
