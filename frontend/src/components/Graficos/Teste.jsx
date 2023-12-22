import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Configuração do arco
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    // Configuração do layout de pizza
    const pie = d3.pie().value((d) => d.value);

    // Adiciona grupos para os arcos
    const arcs = svg
      .selectAll('g.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Adiciona os próprios arcos
    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i]);
    // Adiciona rótulos fora do gráfico
    arcs
      .append('text')
      .attr('transform', (d) => {
        const [x, y] = arc.centroid(d);
        return `translate(${x * 2},${y * 2})`; // Ajuste conforme necessário
      })
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .text((d) => d.data.label);

    // Adiciona rótulos dentro do gráfico
    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)/2})`)
      // .attr('transform', (d) => (console.log(arc.centroid(d))))
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .text((d) => d.data.value);
  }, [data]);

  return <svg ref={svgRef} width={400} height={400}></svg>;
};


const Teste = () => {
  const data = [
    { value: 30 },
    { value: 20 },
    { value: 25 },
    { value: 25 },
  ];

  return (
    <div className="h-[350px] w-[700px] relative">
      <PieChart data={data} />
    </div>
  );
}

export default Teste