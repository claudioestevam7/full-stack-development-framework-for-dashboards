import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'


const SpeedometerChart = (value) => {
  const valoreCrtiticos = {
    Poor: [[0, 25], "#FF5A64"],
    Average: [[25, 70], "#FEEB9A"],
    Good: [[70, 90], "#B4D3EB"],
    Excellent: [[90, 100], "#8BDA92"]
  }

  const metricas = [[0, "#F2F2F2"],
  [10, "#D6D7D8", "#000"],
  [20, "#BEBEBE", "#000"],
  [30, "#A5A5A5", "#fff"],
  [40, "#7E7E7E", "#fff"],
  [50, "#7D7C7D", "#fff"],
  [60, "#7E7C7E", "#fff"],
  [70, "#595959", "#fff"],
  [80, "#414243", "#fff"],
  [90, "#292929", "#fff"]]

  const chartRef = useRef();



  const graus_radianos = (value) => {
    return (value * Math.PI / 180)
  }

  useEffect(() => {
    const width = 700;
    const height = 350;
    const radius = width / 2;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');



    for (let key in valoreCrtiticos) {
      if (valoreCrtiticos.hasOwnProperty(key)) {
        let startAngle = (valoreCrtiticos[key][0][0] * 180) / 100
        let endAngle = (valoreCrtiticos[key][0][1] * 180) / 100

        const arc = d3.arc()
          .innerRadius(270)
          .outerRadius(radius - 40)
          .startAngle(graus_radianos(startAngle))
          .endAngle(graus_radianos(endAngle));

        svg.append('path')
          .attr('d', arc)
          .attr('fill', valoreCrtiticos[key][1])
          .attr('stroke', 'black');

      }
    }


    for (let i = 0; i < metricas.length; i++) {
      let startAngle = (metricas[i][0] * 180) / 100
      let endAngle = startAngle + (10 * 180) / 100

      const arc = d3.arc()
        .innerRadius(310)
        .outerRadius(radius)
        .startAngle(graus_radianos(startAngle))
        .endAngle(graus_radianos(endAngle));

      svg.append('path')
        .attr('d', arc)
        .attr('fill', metricas[i][1])
        .attr('stroke', 'black');

      svg.append('text')
        .attr('transform', (d) => `translate(${arc.centroid(d)}) rotate(90)`)
        .attr('dy', '0.35em')
        .text(metricas[i][0])
        .attr('fill', metricas[i][2])
        .style('text-anchor', 'middle')




    }

    // Ponteiro
    const valorPonteiro = value.value
    console.log(valorPonteiro)
    const ponteiro = d3.arc()
      .innerRadius(150)
      .outerRadius(radius - 2)
      .startAngle(graus_radianos((valorPonteiro * 180) / 100))
      .endAngle(graus_radianos(((valorPonteiro + 0.5) * 180) / 100))
      .cornerRadius(7);

    svg.append('path')
      .attr('d', ponteiro)
      .attr('fill', "#000")
      .attr('stroke', 'black');

    svg.append('text')
      .text('28')
      .attr('transform', `translate(${0 + 80}, ${0}) rotate(90)`) // Ajuste o valor 'height - 10' conforme necessário
      .attr('font-size', '100') // Ajuste o tamanho da fonte conforme necessário
      .attr('text-anchor', 'middle') // Alinhar o texto no meio
      .attr('dominant-baseline', 'middle') // Alinhar o texto verticalmente no meio
      .attr('fill', '#687DBE')

    // Centralizar na tela (ajustando a translação)
    svg.attr("transform", `translate(${width / 2}, ${height}) rotate(-90)`);



    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };

  }, []);

  return <div ref={chartRef} />;
};


export default SpeedometerChart