import mongoose from 'mongoose'
import faker from 'faker'

const { Schema, model } = mongoose


const PizzaSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "https://source.unsplash.com/200x200/?foood,pizza" }
},
{
  versionKey: false,
})

const Pizza = model('Pizza', PizzaSchema)

export default Pizza