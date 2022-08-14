import './App.css';
import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';
import MainContext from './MainContext';
import BrandsData from './brands.json';
import Copied from './components/copied/Copied';

function App() {

  const brandsArray = [];
  Object.keys(BrandsData).forEach(function (key) {
    brandsArray.push(BrandsData[key]);
  });
  console.log(brandsArray);

  const [brands, setBrands] = useState(brandsArray);

  const [selectedBrands, setSelectedBrands] = useState([]);

  const [copied, setCopied] = useState(false);

  const [search, setSearch] = useState('');

  const data = {
    brands,
    selectedBrands,
    setSelectedBrands,
    setCopied,
    search,
    setSearch
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }
      , 2000);
    return () => clearTimeout(timeout);
  }, [copied])

  useEffect(() => {
    setBrands(brandsArray.filter(brand => brand.title.toLowerCase().includes(search)));
  }, [search])


  return (
    <>
      <MainContext.Provider value={data}>
        {copied && <Copied color={copied} />}
        <Sidebar />
        <Content />
      </MainContext.Provider>
    </>
  );
}

export default App;
