import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Navbar, Container, Button, Form, FormControl } from 'react-bootstrap'
import { GiShoppingBag } from 'react-icons/gi'
import { ImSearch } from 'react-icons/im'
import PizzasContext from '../contexts/pizzas/PizzasContext'
import useWindowSize from '../helpers/useWindowSize'
import SearchContext from '../contexts/search/SearchContext'
import CartContext from '../contexts/cart/CartContext'

const Header = () => {
  const  { searchQuery, setSearchQuery }= useContext(SearchContext)
  const { allPizzas, setAllPizzas } = useContext(PizzasContext)
  const { cart } = useContext(CartContext)
  const { width } = useWindowSize()
  
  const handleInput = e => setSearchQuery(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    setSearchQuery(searchQuery)
  }

  return (
    <Navbar 
      bg="dark"
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
              : <NavLink to='/cart' >
                  <GiShoppingBag size={32} color='white' />
                  {
                    cart
                    ? cart.pizzas.length
                    : 0
                  }
                </NavLink>
            }
        </Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Header
