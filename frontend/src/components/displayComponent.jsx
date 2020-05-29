import React, { useState, useEffect } from 'react';

import { clearOrders } from '../fetchingData';
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

  //! calculate total price => products + orders
  props.products.forEach((product) => {
    orders.forEach((order) => {
      if (order.productId === product.id) {
        total = total + order.quantity * product.price;
      }
    });
  });

  return (
    <div style={{ display: 'flex', padding: '2rem', flexFlow: 'row wrap' }}>
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
      <div style={{ width: '30%' }}>
        <h3 className="card-title">
          Cart &nbsp;
          <img
            src={'https://i.imgur.com/FSjziNK.png'}
            alt={'cart-icon'}
            width={35}
            height={35}
          />
        </h3>
        <hr />
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
        <hr />
        {orders.length !== 0 ? (
          <div>
            <h4>
              <small>Total Amount:</small>
              <span className="float-right">${total}</span>
            </h4>
            <hr />
          </div>
        ) : (
          ''
        )}

        {orders.length !== 0 ? (
          <>
            <button className="btn btn-success float-right">Checkout</button>

            <button
              className="btn btn-danger float-right"
              style={{ marginRight: '10px' }}
              onClick={() => clearOrders(setorders)}
            >
              Clear Cart
            </button>
            <br />
            <br />
            <br />
          </>
        ) : (
          <h3 className="text-warning">No item on the cart</h3>
        )}
      </div>
    </div>
  );
};

export default DisplayComponent;
