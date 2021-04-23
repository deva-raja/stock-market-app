import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import axios from 'axios';
const alpha = require('alphavantage')({ key: ' UEWYWI7DJJMYPQK1' });

function Graph() {
  const [xAxis, setxAxis] = useState([]);
  const [yAxis, setyAxis] = useState([]);
  const [company, setCompany] = useState('');
  const [search, setSearch] = useState(false);
  const [country, setCountry] = useState('');

  useEffect(() => {
    // const API_KEY = ' UEWYWI7DJJMYPQK1';

    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
      params: { q: 'Tata Motors Limited', region: 'IN' },
      headers: {
        'x-rapidapi-key': '8db0c26fb2msh347e2ec01c2491bp159ba6jsn118b515b7e11',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let data = response.data;
        console.log(data);
        let symbol = data.quotes[0].symbol;
        console.log(symbol);
      })
      .catch(function (error) {
        console.error(error);
      });

    /* 
 alpha advantage 
  */
    let symbol = 'TATASTLBSL.BSE';
    alpha.data
      .daily(`${symbol}`, 10)
      .then((data) => {
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
        let datax = xreverse.slice(-15);
        let datay = yreverse.slice(-15);
        let dayMonth = datax.map((element) => {
        let split = element.split('-');
        let date = format(new Date(split[0], split[1] - 1, split[2]), 'PP');
        let ans = date.slice(0, 6);
        return ans;
      });
        setxAxis(dayMonth);
        setyAxis(datay);
      })
      .catch((error) => {
        // setxAxis(datax);
        // setyAxis(datay);
      });
  }, [search]);

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
      <div className='search-form'>
        <input type='text' value={company} onChange={(e) => setCompany(e.target.value)} />
        <select name='countries' value={country} onChange={(e)=>setCountry(e.target.value)}>
          <option value='IN'>India</option>
          <option value='US'>United States</option>
        </select>
        <button value={search} onClick={(e) => setSearch(!e.target.value)}>
          search
        </button>
      </div>
      <div className='container'>
        {/* <Line height={400} width={1000} data={data} options={{ maintainAspectRatio: false }} /> */}
      </div>
    </div>
  );
}

export default Graph;
