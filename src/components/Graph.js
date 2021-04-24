import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
const alpha = require('alphavantage')({ key: ' UEWYWI7DJJMYPQK1' });

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textControl: {
    borderRadius: 20,
  },
}));

function Graph() {
  const classes = useStyles();
  const [chartXAxis, setchartXAxis] = useState([]);
  const [chartYAxis, setchartYAxis] = useState([]);
  const [company, setCompany] = useState('apple');
  const [country, setCountry] = useState('US');
  const [search, setSearch] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // yahoo api call
    // const options = {
    //   method: 'GET',
    //   url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
    //   params: { q: company, region: country },
    //   headers: {
    //     'x-rapidapi-key': 'b1cb282494msh3d6f3625ef1ad49p1b7e13jsnfdb4fdb8355b',
    //     'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    //   },
    // };

    // yahho api call

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     let data = response.data;
    //     let companySymbol = data.quotes[0].symbol;

    // alpha advantage
    // store x y coordinates
    // let xCoordinate = [];
    // let yCoordinate = [];

    // alpha.data
    //   .daily(`${companySymbol}`, 10)
    //   .then((data) => {
    //     console.log(data);
    //     let array = Object.entries(data);
    //     let result = array[1][1];
    //     for (let key in result) {
    //       xCoordinate.push(key);
    //       yCoordinate.push(result[key]['1. open']);
    //     }
    //     // need to get latest data so reverse
    //     let xreverse = xCoordinate.reverse();
    //     let yreverse = yCoordinate.reverse();
    //     let datax = xreverse.slice(-15);
    //     let datay = yreverse.slice(-15);

    // for daily data
    // let dayStock = datax.map((element) => {
    //   let split = element.split('-');
    //   let date = format(new Date(split[0], split[1] - 1, split[2]), 'PP');
    //   let ans = date.slice(0, 6);
    //   return ans;
    // });
    // setchartXAxis(dayStock);

    //       setchartXAxis(dayStock);
    //       setchartYAxis(datay);
    //       setTitle(company[0].toUpperCase() + company.slice(1));
    //     })
    //     .catch((error) => {
    //       // setxAxis(datax);
    //       // setyAxis(datay);
    //     });
    // })
    // .catch(function (error) {
    //   console.error(error);
    // });

    // dummy data
    let dayStock = [
      '2021-04-05',
      '2021-04-06',
      '2021-04-07',
      '2021-04-08',
      '2021-04-09',
      '2021-04-12',
      '2021-04-13',
      '2021-04-14',
      '2021-04-15',
      '2021-04-16',
      '2021-04-19',
      '2021-04-20',
      '2021-04-21',
      '2021-04-22',
      '2021-04-23',
    ];

    let datay = [
      '123.8700',
      '126.5000',
      '125.8300',
      '128.9500',
      '129.8000',
      '132.5200',
      '132.4400',
      '134.9400',
      '133.8200',
      '134.3000',
      '133.5100',
      '135.0200',
      '132.3600',
      '133.0400',
      '132.1600',
    ];

    // below 3 lines dummy data format
    setchartXAxis(dayStock);
    setchartYAxis(datay);
    setTitle(company[0].toUpperCase() + company.slice(1));
    // below 1 line is actual code
    setCompany('');
  }, [search]);

  const chartData = {
    labels: chartXAxis,
    active: false,
    datasets: [
      {
        label: `${title} Stock Prices`,
        data: chartYAxis,
        fill: true,
        backgroundColor: '#8ab9c596',
        borderColor: '#75abeb',
      },
    ],
  };

  let chartOptions = {
    maintainAspectRatio: false,
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSearch((prev) => !prev);
  }

  return (
    <div className='wrapper'>
      <form className='search-container' onSubmit={(e) => handleSubmit(e)}>
        {/* <input type='text' value={company} onChange={(e) => setCompany(e.target.value)} /> */}
        <TextField
          placeholder='Eg:facebook'
          className={classes.textControl}
          id='outlined-basic'
          label='company name'
          variant='outlined'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        {/* <select name='countries' value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value='IN'>India</option>
            <option value='US'>United States</option>
          </select> */}

        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Country</InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label='Country'
          >
            <MenuItem value={'US'}>United States</MenuItem>
            <MenuItem value={'IN'}>India</MenuItem>
          </Select>
        </FormControl>

        {/* <button>search</button> */}
        <Button type='submit' variant='contained' color='primary'>
          search
        </Button>
      </form>
      <div className='chart-container'>
        {/* <Line height={450} width={1000} data={chartData} options={chartOptions} /> */}
        <Line responsive={true} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Graph;
