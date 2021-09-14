import mongoose from 'mongoose'
import dotenv from 'dotenv'
import faker from 'faker'
import Pizza from '../models/Pizza.js'
import Cart from '../models/Cart.js';


dotenv.config();
const MONGO_URI = process.env.MONGO_URI;


(async () => {

  // connection to the DB
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection to DB established!'))
  .catch(err => console.log(`[ERROR] Connection failed => ${err}`))

  // Delete all pizzas
  try {
    await Pizza.deleteMany({});
    await Cart.deleteMany({});
    console.log('All pizzas have been deleted')
  } catch (err) {
    console.log(err)
  }

  // Create fake pizzas
  const pizzaPromises = Array(15)
    .fill(null)
    .map(() => {
      const pizzaData = {
        name: faker.address.cityName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(7.99, 13.80),
        image: "https://source.unsplash.com/200x200/?foood,pizza"
      }

      console.log(`Pizza ${pizzaData.name} has been created`)

      return Pizza.create(pizzaData)
    })
  
  try {
    await Promise.all(pizzaPromises)
    console.log('==================================')
    console.log('All 15 pizzas have been stored into the DB')
    console.log('==================================')
  } catch (err) {
    console.log(err)
  }

  mongoose.connection.close()

})()