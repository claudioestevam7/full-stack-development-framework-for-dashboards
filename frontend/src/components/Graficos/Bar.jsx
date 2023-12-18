import React from 'react'

const BarChart = ({
  data,
  width = 800,
  height = 500,
  margin = { top: 30, right: 30, bottom: 50, left: 50 },
  xKey = 'x',
  yKey = 'y',
  barColor = '#4CAF50',
  barWidth = 20,
  barPadding = 5,
  backgroundColor = '#f9f9f9',
  grid = true,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    // Escalas
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d[xKey]))
      .range([0, svgWidth])
      .paddingInner(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[yKey])])
      .range([svgHeight, 0]);

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Adiciona um retângulo de fundo
    svg.append('rect').attr('width', svgWidth).attr('height', svgHeight).attr('fill', backgroundColor);

    // Adiciona barras ao gráfico
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d[xKey]))
      .attr('y', (d) => yScale(d[yKey]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => svgHeight - yScale(d[yKey]))
      .attr('fill', barColor);

    // Adiciona rótulos nas barras
    svg
      .selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => xScale(d[xKey]) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d[yKey]) - 5)
      .attr('text-anchor', 'middle')
      .text((d) => d[yKey]);

    // Adiciona eixos
    svg.append('g').attr('transform', `translate(0, ${svgHeight})`).call(d3.axisBottom(xScale));

    svg.append('g').call(d3.axisLeft(yScale));

    // Adiciona grade ao gráfico
    if (grid) {
      svg.append('g').attr('class', 'grid').call(d3.axisLeft(yScale).tickSize(-svgWidth).tickFormat(''));
    }

    // Cleanup
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [data, width, height, margin, xKey, yKey, barColor, barWidth, barPadding, backgroundColor, grid]);

  return <div ref={chartRef}></div>;
};

const Bar = () => {
  const data = [
    { x: 'Categoria 1', y: 30 },
    { x: 'Categoria 2', y: 50 },
    { x: 'Categoria 3', y: 20 },
    { x: 'Categoria 4', y: 45 },
  ];

  return (
    <div>
      <h1>Gráfico de Colunas</h1>
      <BarChart
        data={data}
        width={800}
        height={500}
        margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
        xKey="x"
        yKey="y"
        barColor="#4CAF50"
        barWidth={40}
        barPadding={10}
        backgroundColor="#f9f9f9"
        grid={true}
      />
    </div>
  );
}

export default Bar