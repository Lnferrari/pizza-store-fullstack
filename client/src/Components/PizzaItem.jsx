import React, { useState, useEffect } from 'react'
import { Col, Card, Button } from 'react-bootstrap'

const PizzaItem = ({data}) => {
  const [isLoading, setLoading] = useState(false);
  const {id, image, name, description, price} = data

  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 750));
  }

  const handleClick = () => setLoading(true);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);
  
  return (
    <Col xl={6}>
      <Card className='h-100' style={{ width: '20rem', margin: '0 auto'}}>
        <Card.Img src={image}  />
        <Card.Body>
          <Card.Title>
            {name}
          </Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Button 
            type='button'
            variant='outline-success'
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
          >
            {isLoading ? 'ADDING…' : 'ADD TO CART'}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default PizzaItem
