import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import axios from 'axios';
const alpha = require('alphavantage')({ key: ' UEWYWI7DJJMYPQK1' });

function Graph() {
  const [chartXAxis, setchartXAxis] = useState([]);
  const [chartYAxis, setchartYAxis] = useState([]);
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('US');
  const [search, setSearch] = useState(false);

  useEffect(() => {
    console.log(search);
    console.log(company);
    console.log(country);
    // const API_KEY = ' UEWYWI7DJJMYPQK1';
    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
      params: { q: company, region: country },
      headers: {
        'x-rapidapi-key': '8db0c26fb2msh347e2ec01c2491bp159ba6jsn118b515b7e11',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let data = response.data;
        let companySymbol = data.quotes[0].symbol;

        // alpha advantage
        alpha.data
          .daily(`${companySymbol}`, 10)
          .then((data) => {
            let array = Object.entries(data);
            let result = array[1][1];
            let xCoordinate = [];
            let yCoordinate = [];
            for (let key in result) {
              xCoordinate.push(key);
              yCoordinate.push(result[key]['1. open']);
            }
            let xreverse = xCoordinate.reverse();
            let yreverse = yCoordinate .reverse();
            let datax = xreverse.slice(-15);
            let datay = yreverse.slice(-15);
            
            let dayMonth = datax.map((element) => {
              let split = element.split('-');
              let date = format(new Date(split[0], split[1] - 1, split[2]), 'PP');
              let ans = date.slice(0, 6);
              return ans;
            });
            setchartXAxis(dayMonth);
            setchartYAxis(datay);
          })
          .catch((error) => {
            // setxAxis(datax);
            // setyAxis(datay);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [search]);

  const data = {
    labels: chartXAxis,
    datasets: [
      {
        label: 'Stock Prices',
        data: chartYAxis,
        fill: true,
        backgroundColor: '#8ab9c596',
        borderColor: '#75abeb',
      },
    ],
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSearch((prev) => !prev);
  }

  return (
    <div className='wrapper'>
      <div className='search-form'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type='text' value={company} onChange={(e) => setCompany(e.target.value)} />
          <select name='countries' value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value='IN'>India</option>
            <option value='US'>United States</option>
          </select>
          <button>search</button>
        </form>
      </div>
      <div className='container'>
        <Line height={400} width={1000} data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default Graph;
