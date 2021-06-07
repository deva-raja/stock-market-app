import React from 'react';

function ShowStockComponent({ companyStock }) {
  console.log(companyStock);
  return (
    <div className='showStock'>
      {companyStock.stock !== '' &&
        companyStock.company !== '' &&
        companyStock.stock !== undefined &&
        companyStock.company !== undefined && (
          <p>{`${companyStock.stock}, ${companyStock.company} `}</p>
        )}
    </div>
  );
}

export default ShowStockComponent;
