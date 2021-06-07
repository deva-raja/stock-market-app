import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import Popper from '@material-ui/core/Popper';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#4e57a0',
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
  palette: {
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
  },
});

export default function AutoCompleteComponent() {
  const classes = useStyles();
  const autoCompleteRef = useRef(null);

  const [stockArray, setStockArray] = useState([]);
  const [error, setError] = useState(false);

  // typed value from autocomplete
  const [typedValues, setTypedValues] = useState();
  // selected from drop down
  const [selectedValues, setSelectedValues] = useState();

  // autocomplete functions
  const handleSubmit = async() => {
    // normal typed input,without drop box
    if(selectedValues === null || selectedValues === undefined){
      try{
        const response = await axios.get(`https://ticker-2e1ica8b9.now.sh/keyword/${typedValues}`);
        console.log(response.data[0].symbol,"typed stock");
        return (response.data[0].symbol);
      }
      catch(e){
        setError(true);
      }
    }

    //selected input,with drop box
    try{
      const symbol = selectedValues.split(', ').slice(0);
      const stockSymbol = symbol[0];
      console.log(stockSymbol,'drop down stock');
    }catch(e){
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
            ref={autoCompleteRef}
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
        <div className='search-btn'>
          <Button
            variant='outlined'
            color='primary'
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
