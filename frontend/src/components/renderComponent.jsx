import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
} from 'reactstrap';

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

export default RenderProductItem;
