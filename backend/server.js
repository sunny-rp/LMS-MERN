import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()


//connect to DB
await connectDB()

app.use(cors())

app.get('/', (req,res)=>{
    res.send("Hello")
})

app.post('/clerk',express.json(), clerkWebhooks)

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})