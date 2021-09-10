import mongoose from "mongoose";
import Pizza from "./Pizza.js";

const { Schema, model } = mongoose


const CartSchema = new Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },
  pizzas: [
    {
      _id: false,
      pizza: { type: Schema.Types.ObjectId, ref: 'Pizza' },
      qty: { type: Number },
    }
  ]
},
{
  versionKey: false,
  timestamps: true,
  toJSON: { virtuals: true },
  id: false
})


CartSchema.virtual('totalPrice').get(function() {
  return this.pizzas.reduce((total, pizza) => {
    total += pizza?.pizza?.price * pizza.qty
    return total
  }, 0) || 0
})

const Cart = model('Cart', CartSchema)

export default Cart