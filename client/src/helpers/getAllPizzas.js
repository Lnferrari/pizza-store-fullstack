import axios from 'axios';

const getAllPizzas = async () => {
  try {
    const res = await axios(`${process.env.REACT_APP_API_URL}/pizzas`)
    const result = await res.data
    return result
  } catch (err) {
    console.log(err)
  }
};

export default getAllPizzas