import React, { useState, useEffect } from 'react';

//! bring components
import Display from './components/displayComponent';
import './assets/style.css';

function App() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res
        .json()
        .then((res) => setproducts(res))
        .catch((err) => console.log(err));
    }

    fetchProducts();
  }, []);
  return (
    <div>
      <Display products={products} />
    </div>
  );
}

export default App;
