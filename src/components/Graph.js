import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useApi from './useApi';
const alpha = require('alphavantage')({ key: ' UEWYWI7DJJMYPQK1' });

function Graph() {
  const [xAxis, setxAxis] = useState([]);
  const [yAxis, setyAxis] = useState([]);

  const data = {
    labels: xAxis,
    datasets: [
      {
        label: '# of Votes',
        data: yAxis,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  useEffect(() => {
    // const API_KEY = ' UEWYWI7DJJMYPQK1';

    alpha.data.daily(`msft`, `daily`, 60).then((data) => {
      let array = Object.entries(data);
      let result = array[1][1];
      let x = [];
      let y = [];

      for (let key in result) {
        x.push(key);
        y.push(result[key]['1. open']);
      }
      setxAxis(x);
      setyAxis(y);
    });
  }, []);

  return (
    <div>
      <h2>Line Example</h2>
      <Line height={400} width={600} data={data} options={options} />
    </div>
  );
}

const options = {
  // maintainAspectRatio: true,
};

export default Graph;
