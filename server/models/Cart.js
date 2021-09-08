import mongoose from "mongoose";
import Pizza from "./Pizza.js";

const { Schema, model } = mongoose


const CartSchema = new Schema({
  pizzas: [{ type: Schema.Types.ObjectId, ref: 'Pizza' }]
},
{
  versionKey: false,
  timestamps: true
})


const Cart = model('Cart', CartSchema)

export default Cart