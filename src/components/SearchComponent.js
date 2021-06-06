import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import Popper from '@material-ui/core/Popper';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

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
    ' & .MuiSvgIcon-root MuiSvgIcon-fontSizeSmall': {
      backgroundColor: 'red',
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

export default function SearchComponent() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4e57a0',
        contrastText: '#191d1f',
      },
      secondary: {
        main: '#4e57a0',
        contrastText: '#191d1f',
      },
      text: {
        primary: ' #4e57a0 ',
        secondary: ' #4e57a0 ',
      },
      typography: {
        fontFamily: ['Roboto', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"'].join(','),
      },
    },
  });

  const [searchKeys, setSearchKeys] = useState();
  const [test, setTest] = useState([]);

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
    <div style={{ width: 500, paddingLeft: '400px', paddingTop: '200px' }}>
      <ThemeProvider theme={theme}>
      <Autocomplete
        id='free-solo-demo'
        freeSolo
        classes={classes}
        onInput={(e) => handleSearch(e)}
        onBlur={(e) => handleBlur(e)}
        options={test.map((option) => `${option.symbol}, ${option.name}`)}
        renderInput={(params) => (
          <TextField {...params} label='Search stock symbols' margin='normal' variant='outlined' />
        )}
        PopperComponent={CustomPopper}
      />
      </ThemeProvider>
    </div>
  );
}