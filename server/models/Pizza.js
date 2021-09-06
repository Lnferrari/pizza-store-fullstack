import mongoose from 'mongoose'

const { Schema, model } = mongoose


const PizzaSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
},
{
  versionKey: false,
})

const Pizza = model('Pizza', PizzaSchema)

export default Pizza