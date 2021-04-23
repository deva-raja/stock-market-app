import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useApi from './useApi';
const alpha = require('alphavantage')({ key: ' UEWYWI7DJJMYPQK1' });

function Graph() {
  const [xAxis, setxAxis] = useState([]);
  const [yAxis, setyAxis] = useState([]);

  useEffect(() => {
    // const API_KEY = ' UEWYWI7DJJMYPQK1';
    let symbol = 'FB';
    alpha.data.daily(`${symbol}`, 10).then((data) => {
      let array = Object.entries(data);
      let result = array[1][1];
      let x = [];
      let y = [];

      for (let key in result) {
        x.push(key);
        y.push(result[key]['1. open']);
      }
      let xreverse = x.reverse();
      let yreverse = y.reverse();

      let datax = xreverse.slice(0, 10);
      let datay = yreverse.slice(0, 10);
      console.log();
      setxAxis(datax);
      setyAxis(datay);
    });
  }, []);

  const data = {
    labels: xAxis,
    datasets: [
      {
        label: 'Stock Prices',
        data: yAxis,
        fill: true,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className='wrapper'>
      <div className='container'>
        <Line height={400} width={1000} data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default Graph;
