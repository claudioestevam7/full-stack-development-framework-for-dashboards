import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import * as Plot from "@observablehq/plot";

const data = [
  { Letras: "a", Frequencia: 0.08167 },
  { Letras: "b", Frequencia: 0.01492 },
  { Letras: "c", Frequencia: 0.02782 },
  { Letras: "d", Frequencia: 0.04253 },
  { Letras: "e", Frequencia: 0.12702 },
  { Letras: "f", Frequencia: 0.02228 },
  { Letras: "g", Frequencia: 0.02015 },
  { Letras: "h", Frequencia: 0.06094 },
  { Letras: "i", Frequencia: 0.06966 },
  { Letras: "j", Frequencia: 0.00153 },
  { Letras: "k", Frequencia: 0.00772 },
  { Letras: "l", Frequencia: 0.04025 },
  { Letras: "m", Frequencia: 0.02406 },
  { Letras: "n", Frequencia: 0.06749 },
  { Letras: "o", Frequencia: 0.07507 },
  { Letras: "p", Frequencia: 0.01929 },
  { Letras: "q", Frequencia: 0.00095 },
  { Letras: "r", Frequencia: 0.05987 },
  { Letras: "s", Frequencia: 0.06327 },
  { Letras: "t", Frequencia: 0.09056 },
  { Letras: "u", Frequencia: 0.02758 },
  { Letras: "v", Frequencia: 0.00978 },
  { Letras: "w", Frequencia: 0.0236 },
  { Letras: "x", Frequencia: 0.0015 },
  { Letras: "y", Frequencia: 0.01974 },
  { Letras: "z", Frequencia: 0.00074 }
];

function MyPlot({ data }) {
  const ref = useRef();

  useEffect(() => {
    const barChart = Plot.plot({
      marks: [
        // Plotar uma linha no rafico
        
        // Plotar o grafico de colunas
        Plot.barY(data, {
          x: "Letras",        //Eixos
          y: "Frequencia",
          stroke:'#1c1c1c',
          fill:'#1c1c1c'
          
        }),
        // Plot.ruleY([0])
        Plot.ruleY([1 / 26], { stroke: "orange", strokeWidth: 3 }),
        Plot.frame()   // poe o quadrado em volta do grafico
      ],

      y: {
        grid: true,
      },
      x:{
      grid:true
      },
      marginLeft: 50,
      marginTop: 50,
      marginBottom: 50
    });
    ref.current.append(barChart);
    return () => barChart.remove();
  }, [data]);

  return (
   
      <div ref={ref}></div>
  );
}

const Column = () => {
  return(
    <div className="App">
        <h1 className='font-bold'>Grafico de Colunas</h1>
        <MyPlot data={data} />
      </div>
    )
}

export default Column