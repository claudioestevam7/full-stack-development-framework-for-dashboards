import React, { useEffect } from 'react';
import * as d3 from 'd3';


const PieChart = () => {
  useEffect(() => {
    // Dados para o gráfico
    const data = [
      { marca: 'Ferrari', quantidade: 20 },
      { marca: 'Ford', quantidade: 30 },
      { marca: 'Volvo', quantidade: 70 },
    ];

    // Configuração do gráfico
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Criar um elemento SVG no componente
    const svg = d3
      .select('#donut-chart-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Criar um arco para o gráfico de donuts
    const arc = d3.arc().innerRadius(radius - 100).outerRadius(radius);

    // Criar uma função para gerar dados de acordo com os valores fornecidos
    const pie = d3.pie().value(d => d.quantidade);

    // Adicionar os arcos ao gráfico
    svg
      .selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => {
        const colors = ['blue', 'orange', 'green'];
        return colors[i];
      });

  }, []);

  return <div id="donut-chart-container" />;

}

export default PieChart

