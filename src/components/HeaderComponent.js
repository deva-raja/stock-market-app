import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function HeaderComponent() {
  const handleClick = (e) => {
    const innerText = e.target.innerText;
    const symbol = innerText.split(', ').slice(0);
    const stockSymbol = symbol[0];
    console.log(stockSymbol);
  };

  return (
    <div className='header'>
      <ButtonGroup
        className='header'
        style={{ width: '100%', height: '65%' }}
        color='primary'
        aria-label='outlined primary button group'
        onClick={(e) => handleClick(e)}
      >
        <Button>TSLA, TELSA</Button>
        <Button>FB, FACEBOOK</Button>
        <Button>AAP, APPLE</Button>
        <Button>NFLX, NETFLIX</Button>
        <Button>GOOGL, GOOGLE</Button>
        <Button>TWTR, TWITTER</Button>
      </ButtonGroup>
    </div>
  );
}

export default HeaderComponent;