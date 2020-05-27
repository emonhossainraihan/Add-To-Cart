import React, { useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Table,
  CardSubtitle,
} from 'reactstrap';

const CheckoutItem = (props) => {
  const addCart = props.addCart;
  const removeCart = props.removeCart;
  const deleteCart = props.deleteCart;
  const { productId, quantity } = props.order;
  const temp = props.products.filter((product) => product.id === productId);

  if (temp.length > 0) {
    const { title, price } = temp[0];

    return (
      <tr>
        <th scope="row">{productId}</th>
        <td>{title}</td>
        <td>
          <span onClick={() => removeCart(productId)}>&#10094;&nbsp;</span>
          <span>{quantity}</span>
          <span onClick={() => addCart(productId)}>&nbsp;&#10095;</span>
        </td>
        <td>{quantity * price}</td>
        <td>
          <span onClick={() => deleteCart(productId)}>&#10005;</span>
        </td>
      </tr>
    );
  } else {
    return null;
  }
};
// remove: &#10005;  increase:  &#10094;  decase:  &#10095;
function RenderProductItem(props) {
  const { imageUrl, title, id, price } = props.product;
  const addCart = props.handleCart;

  return (
    <div style={{ padding: '0.5rem 1rem' }}>
      <Card className="text-center">
        <CardImg top src={imageUrl} alt={title} />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>price: &#36;{price}</CardSubtitle>
          <Button onClick={() => addCart(id)}>Add to Cart</Button>
        </CardBody>
      </Card>
    </div>
  );
}
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
