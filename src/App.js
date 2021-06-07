import { useState } from 'react';
import './App.css';
import AutoCompleteComponent from './components/AutoCompleteComponent';
import HeaderComponent from './components/HeaderComponent';
import StockComponent from './components/StockComponent';

function App() {
  const [companyStockSymbol, setCompanyStockSymbol] = useState('');
  return (
    <div className='App'>
      <HeaderComponent setCompanyStockSymbol={setCompanyStockSymbol} />
      <AutoCompleteComponent setCompanyStockSymbol={setCompanyStockSymbol} />
      <StockComponent companyStockSymbol={companyStockSymbol} />
    </div>
  );
}

export default App;
