import axios from 'axios';

const getAllPizzas = async () => {

  const API_URL = process.env.MONGO_URI;

  try {
    const res = await axios(`${API_URL}/pizzas`)
    console.log(res)
    const result = await res.json()
    console.log(result)
    return JSON.parse(result)
  } catch (err) {
    console.log(err)
  }
};

export default getAllPizzas