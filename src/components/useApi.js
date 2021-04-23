// import { useState, useEffect } from 'react';
// // import axios from 'axios';
// const alpha = require('alphavantage')({ key: ' UEWYWI7DJJMYPQK1' });

// function useApi() {
//   const [xAxis, setxAxis] = useState([]);
//   const [yAxis, setyAxis] = useState([]);

//   useEffect(() => {
//     // const API_KEY = ' UEWYWI7DJJMYPQK1';

//     alpha.data
//       .daily(`msft`, `daily`, 60)
//       .then((data) => {
//         let array = Object.entries(data);
//         let result = array[1][1];
//         let x = [];
//         let y = [];

//         for (let key in result) {
//           x.push(key);
//           y.push(result[key]['1. open']);
//         }
//         setxAxis(x);
//         setyAxis(y);
//       })
//       // .catch((error) => {
//       //   setxAxis(error);
//       //   setyAxis(error);
//       // });
//   }, []);
//   return [xAxis, yAxis];
// }

// export default useApi;


// 
// Split between codes 
// 


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
