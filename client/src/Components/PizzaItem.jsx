import React, { useState, useEffect, useContext } from 'react'
import { Form, FormControl, Row, Col, Card, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';


const initialPizzaState = {
  name: '',
  price: '',
  description: ''
}

const PizzaItem = ({pizzaData, editablePizzaId, setPizzaInEditionMode, updatePizza, onDelete }) => {
  const [ editedPizza, setEditedPizza ] = useState(initialPizzaState)
  const [ isLoading, setLoading ] = useState(false);
  const { _id, image, name, description, price } = pizzaData
  const { pathname } = useLocation()
  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 750));
  }

  const addToCart = () => setLoading(true);
  
  const handleEditClick = pizza => {
    setEditedPizza({
      name: pizza.name,
      price: pizza.price,
      description: pizza.description
    })
    setPizzaInEditionMode(pizza._id)
    console.log(pizza._id)
  }

  const inputEditionHandler = e => {
    setEditedPizza({
      ...editedPizza,
      [e.target.name]: e.target.value
    })
  }

  const submitEditionHandler = (id, editedPizzaData) => {
    updatePizza(id, editedPizzaData)
    setPizzaInEditionMode(null)
  }
  

  const adminButtons = (
    <>
      <Button
        variant="outline-danger"
        className='float-end align-bottom'
        onClick={() => onDelete(_id)}>
          Delete
      </Button>
      {'  '}
      {
        _id === editablePizzaId
        ? <Button 
            variant="outline-success"
            className='float-start align-bottom'
            onClick={() => submitEditionHandler(_id, editedPizza)}>
              Confirm
        </Button>
        : <Button 
            variant="outline-warning"
            className='float-start align-bottom'
            onClick={() => handleEditClick(pizzaData)}>
              Edit
        </Button>
      }
    </>
  )

  const clientButton = (
    <Button type='button'
      variant='outline-success'
      disabled={isLoading}
      onClick={!isLoading ? addToCart : null}
      className='float-end align-bottom'
    >
      {isLoading ? 'ADDING…' : 'ADD TO CART'}
    </Button>
  )

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    setPizzaInEditionMode(null)
  }, [])
  
  return (
    <Col xl={6} className='mx-auto mb-5'>
      <Card className={`${pathname.startsWith('/admin') ? 'adminCard' : 'pizzaCard'} h-100`}
        style={{ width: '20rem', margin: '0 auto'}}>
        <Card.Img src={image}  />
        <Card.Body>
        {
          _id === editablePizzaId
          ? <Form onChange={inputEditionHandler}>
              <Row>
                <Col md={9}>
                  <Form.Control name='name' value={editedPizza.name} />
                </Col>
                <Col md={3}>
                  <Form.Control name='price' value={`${editedPizza.price}`} />
                </Col>
              </Row>
                <Row>
                  <Form.Control name='description' as="textarea" rows={5}>
                    {description}
                  </Form.Control>
                </Row>
            </Form>
          : <>
              <Card.Title>
                {name}
                <span className='text-muted float-end'>
                  ${price}
                </span>
              </Card.Title>
              <Card.Text>
                {description}
              </Card.Text>
            </>
        }            
        </Card.Body>
        <div className='buttons_container'>
            {
              pathname.startsWith('/admin')
              ? adminButtons
              : clientButton
            }
          </div>
      </Card>
    </Col>
  )
}

export default PizzaItem
