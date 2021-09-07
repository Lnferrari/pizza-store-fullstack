import axios from 'axios';

const getAllPizzas = async () => {
  try {
    const res = await axios('http://localhost:5000/pizzas')
    const result = await res.data
    return result
  } catch (err) {
    console.log(err)
  }
};

export default getAllPizzas