import React from 'react';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function HeaderComponent({  setCompanyStock }) {
  const handleClick = (e) => {
    const innerText = e.target.innerText;
    const symbol = innerText.split(', ').slice(0);
    const companyName = innerText.split(', ').slice(1);
    const stockSymbol = symbol[0];
    const stockCompany = companyName[0];
    console.log(stockSymbol);
    setCompanyStock({stock:stockSymbol,company:stockCompany});
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
