import './App.css';
import AutoCompleteComponent from './components/AutoCompleteComponent';
import HeaderComponent from './components/HeaderComponent';
import StockComponent from './components/StockComponent';

function App() {
  return (
    <div className='App'>
      <HeaderComponent/>
      <AutoCompleteComponent />
      <StockComponent />
    </div>
  );
}

export default App;
