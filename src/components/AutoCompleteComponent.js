import { Button } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: '#4e57a0',
    },
    error:{
    '& .MuiFormLabel-root': {
      color: '#4e57a0',
    },

    }
  },
  inputRoot: {
    color: '#4e57a0',
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      paddingLeft: 6,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4e57a0 ',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: ' #4e57a0',
    },
  },
  clearIndicator: {
    color: '#4e57a0',
  },
  popper: {
    '& .MuiAutocomplete-listbox': {
      color: '#4e57a0',
      background: '#1e1f20',
    },
  },
}));

const theme = createMuiTheme({
  //   palette: {
  //   error: {
  //     // main: "#fff"
  //   }
  // },
  primary: {
    main: '#4e57a0',
  },
  secondary: {
    main: '#f44336',
  },
  text: {
    secondary: ' #4e57a0 ',
  },
  typography: {
    fontFamily: ['Roboto', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"'].join(','),
  },
});

const Errortheme = createMuiTheme({
  palette: {
    action: {
      disabledBackground: '#191d1f',
      disabled: '#4e57a0',
    },
  },
  typography: {
    fontFamily: ['Roboto', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"'].join(','),
  },
});

export default function AutoCompleteComponent({ setCompanyStock, disableBtn }) {
  const classes = useStyles();

  const [stockArray, setStockArray] = useState([]);
  const [error, setError] = useState(false);

  // typed value from autocomplete
  const [typedValues, setTypedValues] = useState();
  // selected from drop down
  const [selectedValues, setSelectedValues] = useState();

  // autocomplete functions
  const handleSubmit = async () => {
    // normal typed input,without drop box
    if (selectedValues === null || selectedValues === undefined) {
      try {
        const response = await axios.get(`https://ticker-2e1ica8b9.now.sh/keyword/${typedValues}`);
        console.log(response.data[0], 'typed stock');
        const data = response.data[0];
        setCompanyStock({ stock: data.symbol, company: data.name });
      } catch (e) {
        setError(true);
      }
    }

    //selected input,with drop box
    try {
      const symbol = selectedValues.split(', ').slice(0);
      const companyName = selectedValues.split(', ').slice(1);
      const stockSymbol = symbol[0];
      const stockCompany = companyName[0];

      console.log(stockSymbol, 'drop down stock');
      return setCompanyStock({ stock: stockSymbol, company: stockCompany });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e, value) => {
    setSelectedValues(value);
  };

  const handleFocus = () => {
    setError(false);
  };

  const handleSearch = async (e) => {
    if (e.target.value === '') {
      setStockArray([]);
      return;
    }

    setTypedValues(e.target.value);
    try {
      const response = await axios.get(`https://ticker-2e1ica8b9.now.sh/keyword/${typedValues}`);
      const stockData = response.data;
      const FlatArray = [].concat(...stockData);
      setStockArray(FlatArray);
    } catch (e) {
      console.log(e);
      setStockArray((state) => state);
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setStockArray([]);
    }
  };

  const CustomPopper = function (props) {
    return <Popper {...props} className={classes.popper} placement='bottom' />;
  };

  return (
    <div className='search-container'>
      <ThemeProvider theme={theme}>
        <div className='auto-complete'>
          <Autocomplete
            id='free-solo-demo'
            freeSolo
            classes={classes}
            onFocus={handleFocus}
            onInput={(e) => handleSearch(e)}
            onChange={(e, value) => handleChange(e, value)}
            onBlur={(e) => handleBlur(e)}
            options={stockArray.map((option) => `${option.symbol}, ${option.name}`)}
            renderInput={(params) => (
              <TextField
                {...params}
                margin='normal'
                label={error ? 'Enter valid stock symbol ' : 'Search stock symbols'}
                error={error}
                variant='outlined'
                placeholder='Try APPL for APPLE INC'
                multiline
              />
            )}
            PopperComponent={CustomPopper}
          />
        </div>
      </ThemeProvider>
      <ThemeProvider theme={Errortheme}>
        <div className='search-btn'>
          <Button
            variant='outlined'
            color='primary'
            disabled={disableBtn}
            onClick={handleSubmit}
            style={{
              height: '55px',
              width: '90%',
              position: 'relative',
              top: '3.5px',
              fontSize: '17px',
            }}
          >
            SEARCH
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
}
