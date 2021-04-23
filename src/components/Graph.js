import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
const alpha = require('alphavantage')({ key: ' UEWYWI7DJJMYPQK1' });

function Graph() {
  const [xAxis, setxAxis] = useState([]);
  const [yAxis, setyAxis] = useState([]);

  useEffect(() => {
    // const API_KEY = ' UEWYWI7DJJMYPQK1';



    
    /* 
 alpha advantage 
  */
    // let symbol = 'TATASTLBSL.BSE';
    // alpha.data
    //   .daily(`${symbol}`, 10)
    //   .then((data) => {
    //     let array = Object.entries(data);
    //     let result = array[1][1];
    //     let x = [];
    //     let y = [];
    //     for (let key in result) {
    //       x.push(key);
    //       y.push(result[key]['1. open']);
    //     }
    //     let xreverse = x.reverse();
    //     let yreverse = y.reverse();
    //     let datax = xreverse.slice(-15);
    //     let datay = yreverse.slice(-15);
    //     let dayMonth = datax.map((element) => {
    //       let split = element.split('-');
    //       let date = format(new Date(split[0], split[1] - 1, split[2]), 'PP');
    //       let ans = date.slice(0, 6);
    //       return ans;
    //     });
    //     setxAxis(dayMonth);
    //     setyAxis(datay);
    //   })
    //   .catch((error) => {
    //     // setxAxis(datax);
    //     // setyAxis(datay);
    //   });
  }, []);

  const data = {
    labels: xAxis,
    datasets: [
      {
        label: 'Stock Prices',
        data: yAxis,
        fill: true,
        backgroundColor: '#8ab9c596',
        borderColor: '#75abeb',
      },
    ],
  };

  return (
    <div className='wrapper'>
      <div className='container'>
        {/* <Line height={400} width={1000} data={data} options={{ maintainAspectRatio: false }} /> */}
      </div>
    </div>
  );
}

export default Graph;
