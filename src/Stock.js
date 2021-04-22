import { useState, useEffect } from 'react';
// import Plot from 'react-plotly.js';
// import axios from 'axios';

function App() {
  // const [stockSymbol, setStockSymbol] = useState('');
  // let alphakey = ' UEWYWI7DJJMYPQK1';
  // let yahho = {
  //   username: 'chubster',
  //   password: 'Rapidapi@123',
  // };

  // NASDAQ: TSLA
  // US|BR|AU|CA|FR|DE|HK|IN|IT|ES|GB|SG
  useEffect(() => {
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

    //   const API_KEY = ' UEWYWI7DJJMYPQK1';
    let StockSymbol = 'FB';
    // prettier-ignore
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&
    symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    axios.get(API_Call).then((data) => {
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
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 20, height: 240, title: 'A Fancy Plot' }}
      />
    </div>
  );
}

export default App;
