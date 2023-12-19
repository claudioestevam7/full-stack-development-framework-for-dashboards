import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { TbTriangleFilled } from "react-icons/tb";

const IndicatorChart = ({

  data,
  width = 800,
  height = 500,
  margin = { top: 30, right: 30, bottom: 50, left: 50 },
  xKey = 'x',
  yKeys = ['y1'],
  lineColors = ['#4CAF50'],
  lineWidth = 2,
  pointRadius = 5,
  backgroundColor = '#f9f9f9',
  grid = true,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    // Escalas
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d[xKey]), d3.max(data, (d) => d[xKey])])
      .range([0, svgWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d[yKeys[0]], d[yKeys[0]]))])
      .range([svgHeight, 0]);

    // area
    const area = d3.area()
      .x(d => xScale(d[xKey]))
      .y0(yScale(0))
      .y1(d => yScale(d.y1));

    // Linhas
    const line = d3.line().x((d) => xScale(d[xKey]));

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Adiciona um retângulo de fundo
    // svg.append('rect').attr('width', svgWidth).attr('height', svgHeight).attr('fill', backgroundColor);

    // Adiciona linhas ao gráfico
    yKeys.forEach((yKey, index) => {
      line.y((d) => yScale(d[yKey]));
      console.log(yKey)
      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', lineColors[0])
        .attr('stroke-width', lineWidth)
        .attr('d', line)
        .style('opacity', 0.8);

      // Adiciona pontos ao longo das linhas
      svg
        .selectAll(`.dot-${index}`)
        .data(data)
        .enter()
        .append('circle')
        .attr('class', `dot-${index}`)
        .attr('cx', (d) => xScale(d[xKey]))
        .attr('cy', (d) => yScale(d[yKey]))
        .attr('r', pointRadius)
        .attr('fill', lineColors[index]);
    });


    const gradient = svg.append('linearGradient')
      .attr('id', 'seuGradiente')  // Defina um ID único para o gradiente
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');

    // Adicione as paradas de cores ao gradiente
    gradient.append('stop')
      .attr('offset', '0%')
      .style('stop-color', 'cor-inicial');

    gradient.append('stop')
      .attr('offset', '100%')
      .style('stop-color', 'cor-final');

    svg.append('path')
      .attr('d', area(data))
      .attr('opacity', '0.3')
      .attr('fill', '#fff');


    // Adiciona eixos
    // svg.append('g').attr('transform', `translate(0, ${svgHeight})`).call(d3.axisBottom(xScale));

    // svg.append('g').call(d3.axisLeft(yScale));

    // Adiciona grade ao gráfico
    // if (grid) {
    //   svg.append('g').attr('class', 'grid').call(d3.axisLeft(yScale).tickSize(-svgWidth).tickFormat(''));
    // }

    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, margin, xKey, yKeys, lineColors, lineWidth, pointRadius, backgroundColor, grid]);

  return <div ref={chartRef}></div>;
};



const Indicator = () => {
  const data = [
    { x: 1, y1: 10, y2: 10, y3: 30, y4: 10 },
    { x: 2, y1: 50, y2: 20, y3: 30, y4: 20 },
    { x: 3, y1: 10, y2: 30, y3: 30, y4: 15 },
    { x: 4, y1: 45, y2: 40, y3: 30, y4: 30 },
    { x: 5, y1: 30, y2: 50, y3: 30, y4: 45 },
    { x: 6, y1: 25, y2: 60, y3: 30, y4: 15 },
    { x: 7, y1: 55, y2: 10, y3: 30, y4: 20 },
    { x: 8, y1: 60, y2: 20, y3: 30, y4: 27 },
  ];

  return (
    <>
      <div className="flex-grow flex px-5 justify-around ">

        <div className="w-[21rem] h-[12rem] bg-secundary-300 rounded-20 border-white border-4 relative flex flex-col">
          <div className="flex">
            <h1 className='text-2xl px-4 py-1 text-white'>Disponibilidade</h1>
          </div>

          <div className="absolute top-4 right-4 flex flex-col items-end">
            <h1 className='text-5xl text-[#3f912f] custom-stroke font-extrabold'>60</h1>
            <div className="flex gap-1 mt-1 items-center text-[#3f912f]">
              <h2>9,09%</h2>
              <TbTriangleFilled />
            </div>
          </div>
          <div className="flex-grow flex items-end px-2 py-2">

            <IndicatorChart
              data={data}
              width={200}
              height={100}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              xKey="x"
              yKeys={['y1']}
              lineColors={['#4CAF50', '#2196F3', '#1c1c1c']}
              lineWidth={3}
              pointRadius={5}
              backgroundColor="#f9f9f9"
              grid={true}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default Indicator