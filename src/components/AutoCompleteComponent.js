import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import Popper from '@material-ui/core/Popper';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

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
  helperText: {
    color: '#dc143c',
    fontSize: '13px',
    textTransform: 'uppercase',
    // marginTop:'8px',
    postition: 'absolute !important',
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
  const handleSubmit = () => {
    setError(true);
  };
  const handleFocus = () => {
    setError(false);
  };

  const classes = useStyles();

  const [searchKeys, setSearchKeys] = useState();
  const [test, setTest] = useState([]);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    if (e.target.value === '') {
      setTest([]);
      return;
    }

    setSearchKeys(e.target.value);
    try {
      const response = await axios.get(`https://ticker-2e1ica8b9.now.sh/keyword/${searchKeys}`);
      const stockData = response.data;
      const FlatArray = [].concat(...stockData);
      setTest(FlatArray);
    } catch (e) {
      console.log(e);
      setTest((state) => state);
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setTest([]);
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
            onBlur={(e) => handleBlur(e)}
            options={test.map((option) => `${option.symbol}, ${option.name}`)}
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
