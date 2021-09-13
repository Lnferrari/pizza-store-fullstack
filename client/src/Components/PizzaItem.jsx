import React, { useState, useEffect, useContext } from 'react'
import { Form, FormControl, Row, Col, Card, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import PizzasContext from '../contexts/pizzas/PizzasContext';
import ModalMessage from './ModalMessage'
import CartContext from '../contexts/cart/CartContext';

const initialPizzaState = {
  name: '',
  price: '',
  description: ''
}

const PizzaItem = ({ id, image, name, description, price }) => {

  const [modalShow, setModalShow] = useState(false);
  const [ editedPizza, setEditedPizza ] = useState(initialPizzaState)
  const {
    setPizzaInEditionMode,
    editablePizzaId,
    updatePizza,
    createPizza,
    deletePizza
  } = useContext(PizzasContext)
  const { addToCart } = useContext(CartContext)
  const { pathname } = useLocation()

  const handleEditClick = (id, name, price, description, image) => {
    setEditedPizza({
      image: image,
      name: name,
      price: price,
      description: description
    })
    setPizzaInEditionMode(id)
  }

  const inputEditionHandler = e => {
    setEditedPizza({
      ...editedPizza,
      [e.target.name]: e.target.value
    })
  }

  const submitEditionHandler = (id, editedPizzaData) => {
    updatePizza(id, editedPizzaData)
    setModalShow(true)
    setPizzaInEditionMode(null)
  }
  

  const adminButtons = (
    <>
      <Button
        variant="outline-danger"
        className='float-end align-bottom'
        onClick={() => deletePizza(id)}>
          Delete
      </Button>
      {'  '}
      {
        id === editablePizzaId
        ? <Button 
            variant="outline-success"
            className='float-start align-bottom'
            onClick={() => submitEditionHandler(id, editedPizza)}>
              Confirm
        </Button>
        : <Button 
            variant="outline-warning"
            className='float-start align-bottom'
            onClick={() => handleEditClick(id, name, price, description, image)}>
              Edit
        </Button>
      }
    </>
  )
  
  const clientButton = (
    <Button type='button'
      variant='outline-success'
      onClick={() => addToCart(id)}
      className='float-end align-bottom'
    >
      ADD TO CART
    </Button>
  )

  useEffect(() => {
    setPizzaInEditionMode(null)
  }, [])
  
  return (
    <Col l={6} className='mx-auto mb-5'>
      <Card className={`${pathname.endsWith('/admin') ? 'adminCard' : 'pizzaCard'} h-100`}
        style={{ width: '18rem', margin: '0 auto'}}>
        <Card.Img src={image}  />
        <Card.Body>
        {
          id === editablePizzaId
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
              pathname.endsWith('/admin')
              ? adminButtons
              : clientButton
            }
          </div>
      </Card>
      <ModalMessage 
        show={modalShow}
        id={id}
        name={name}
        price={price}
        description={description}
        onHide={() => setModalShow(false)}
      />
    </Col>
  )
}

export default PizzaItem
