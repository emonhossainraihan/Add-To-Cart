export const fetchProducts = async (setproducts) => {
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
};

export const clearOrders = async (setproducts) => {
  const res = await fetch('http://localhost:3000/orders', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  res
    .json()
    .then((res) => setproducts(res))
    .catch((err) => console.log(err));
};
