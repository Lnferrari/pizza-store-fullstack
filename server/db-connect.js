import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()
const MONGO_URI = process.env.MONGO_URI


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connection to DB established!'))
.catch(err => console.log(`[ERROR] Connection failed => ${err}`))