import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    const API_KEY = ' UEWYWI7DJJMYPQK1';
    let StockSymbol = 'FB';
    // prettier-ignore
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    axios.get(API_Call).then((data) => {
      console.log(data);
      let array = Object.entries(data);
      let result = array[1][1];
      let x = [];
      let y = [];
      for (let key in result) {
        x.push(key);
        y.push(result[key]['1. open']);
      }
    });
  }, []);

  return (
    <div className='App'>
      <h2>hello</h2>
    </div>
  );
}

export default App;

// const options = {
//   method: 'GET',
//   url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
//   params: { q: 'Microsoft', region: 'US' },
//   headers: {
//     'x-rapidapi-key': '8db0c26fb2msh347e2ec01c2491bp159ba6jsn118b515b7e11',
//     'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     let data = response.data;
//     let symbol = data.quotes[0].symbol;
//     setStockSymbol(symbol);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
