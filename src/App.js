import { useEffect, useState } from 'react';
import './App.css';
import AutoCompleteComponent from './components/AutoCompleteComponent';
import HeaderComponent from './components/HeaderComponent';
import StockComponent from './components/StockComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [companyStock, setCompanyStock] = useState({ stock: '', company: '' });
  const [limitReached, setLimitReached] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const notify = () =>
    toast.dark('5 calls per min limit,please wait', {
      autoClose: 10000,
      hideProgressBar: true,
    });

  useEffect(() => {
    if (limitReached === true) {
      notify();
    }

    setLimitReached(false);
  }, [limitReached]);

  return (
    <div className='App'>
      <HeaderComponent setCompanyStock={setCompanyStock} disableBtn={disableBtn}/>
      <AutoCompleteComponent setCompanyStock={setCompanyStock} disableBtn={disableBtn}/>
      <StockComponent companyStock={companyStock} setLimitReached={setLimitReached} setDisableBtn={setDisableBtn}/>
      <ToastContainer />
    </div>
  );
}

export default App;
