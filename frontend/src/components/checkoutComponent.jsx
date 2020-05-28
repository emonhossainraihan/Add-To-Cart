import React from 'react';

const CheckoutItem = (props) => {
  const addCart = props.addCart;
  const removeCart = props.removeCart;
  const deleteCart = props.deleteCart;
  const { productId, quantity } = props.order;
  const temp = props.products.filter((product) => product.id === productId);

  if (temp.length > 0) {
    const { title, price } = temp[0];

    return (
      <div className="card" style={{ marginBottom: '10px' }}>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <h5 className="card-text">
            <small>price: </small>${price}&#x2717;{quantity}=$
            {price * quantity}
          </h5>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => removeCart(productId)}
          >
            &#10094;&nbsp;
          </span>
          <span className="card-text text-success">
            <small>Quantity: </small>
            {quantity}
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => addCart(productId)}
          >
            &nbsp;&#10095;
          </span>
          <button
            className="btn btn-sm btn-warning float-right"
            onClick={() => deleteCart(productId)}
          >
            Remove from cart
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CheckoutItem;
