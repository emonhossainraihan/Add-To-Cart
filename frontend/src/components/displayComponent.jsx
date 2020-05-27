import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';

//! bring component
import CheckoutItem from './checkoutComponent';
import RenderProductItem from './renderComponent';

const DisplayComponent = (props) => {
  const [orders, setorders] = useState([]);
  async function fetchToCart(productId) {
    const res = await fetch(`http://localhost:3000/orders/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res
      .json()
      .then((res) => setorders(res))
      .catch((err) => console.log(err));
  }

  async function discardFromCart(productId) {
    const res = await fetch(`http://localhost:3000/orders/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res
      .json()
      .then((res) => setorders(res))
      .catch((err) => console.log(err));
  }

  async function deleteCart(productId) {
    const res = await fetch(`http://localhost:3000/orders/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res
      .json()
      .then((res) => setorders(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('http://localhost:3000/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res
        .json()
        .then((res) => setorders(res))
        .catch((err) => console.log(err));
    }

    fetchOrders();
  }, [setorders]);

  var total = 0;

  props.products.forEach((product) => {
    orders.forEach((order) => {
      if (order.productId === product.id) {
        total = total + order.quantity * product.price;
      }
    });
  });
  console.log(total);

  return (
    <div style={{ display: 'flex', padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
        }}
      >
        {props.products.length !== 0
          ? props.products.map((product) => {
              return (
                <div key={product.id}>
                  <RenderProductItem
                    product={product}
                    handleCart={fetchToCart}
                  />
                </div>
              );
            })
          : null}
      </div>
      <div style={{ background: '#ffc600' }}>
        <div style={{ textAlign: 'center' }}>Your Cart</div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {orders.length !== 0
              ? orders.map((order, i) => {
                  return (
                    <CheckoutItem
                      key={i}
                      order={order}
                      products={props.products}
                      addCart={fetchToCart}
                      removeCart={discardFromCart}
                      deleteCart={deleteCart}
                    />
                  );
                })
              : null}
            <tr>
              <th scope="row">-</th>
              <td>Total:</td>
              <td></td>

              <td>{total}</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DisplayComponent;
