import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Container, Form, FormControl } from 'react-bootstrap'
import { GiShoppingBag } from 'react-icons/gi'
import useWindowSize from '../helpers/useWindowSize'
import SearchContext from '../contexts/search/SearchContext'
import CartContext from '../contexts/cart/CartContext'

const Header = () => {
  const  { searchQuery, setSearchQuery }= useContext(SearchContext)
  const { cart } = useContext(CartContext)
  const { width } = useWindowSize()
  
  const handleInput = e => setSearchQuery(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    setSearchQuery(searchQuery)
  }

  return (
    <Navbar 
      bg="danger"
      variant="dark"
      sticky="top"
      expand="xl"
    >
      <Container className='px-5' fluid>
        <Navbar.Brand href="/" className='fw-bold'>
          Pizzeria Ferrari
        </Navbar.Brand>
        <Navbar.Text className="justify-content-end">
            {
              width >= 768
              ? <Form className="d-flex" style={{ maxHeight: '32px' }} onSubmit={handleSubmit}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="mr-4"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleInput}
                  />
                </Form>
              : <NavLink to='/cart'
                  className="shopping_bag d-flex align-items-center justify-content-center">
                  <GiShoppingBag size={32} color='white'/>
                  {
                    cart && cart?.pizzas?.length > 0
                    ? <span className='header_cart_qty text-dark fw-bold'>
                      {cart.pizzas.length}
                    </span>
                    : null
                  }
                </NavLink>
            }
        </Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Header
