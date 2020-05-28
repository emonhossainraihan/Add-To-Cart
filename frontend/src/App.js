import React, { useState, useEffect } from 'react';

import { fetchProducts } from './fetchingData';
//! bring components
import Display from './components/displayComponent';
import './assets/style.css';

function App() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetchProducts(setproducts);
  }, []); /* As I know your backend didn't add new product that's why I use it as componentDidMount*/

  return (
    <div>
      <Display products={products} />
    </div>
  );
}

export default App;
