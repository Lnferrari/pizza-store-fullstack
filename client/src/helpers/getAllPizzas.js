import axios from 'axios';

const getAllPizzas = async () => {
  try {
    const res = await axios('http://localhost:5000/pizzas')
    console.log(res)
    const result = await res.data
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
  }
};

export default getAllPizzas