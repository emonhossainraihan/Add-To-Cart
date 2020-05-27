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

export default CheckoutItem;
