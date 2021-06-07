import { useState } from 'react';
import './App.css';
import AutoCompleteComponent from './components/AutoCompleteComponent';
import HeaderComponent from './components/HeaderComponent';
import StockComponent from './components/StockComponent';

function App() {
  const [companyStock, setCompanyStock] = useState('');
  return (
    <div className='App'>
      <HeaderComponent setCompanyStockSymbol={setCompanyStock} />
      <AutoCompleteComponent setCompanyStockSymbol={setCompanyStock} />
      <StockComponent companyStockSymbol={companyStock} />
    </div>
  );
}

export default App;
