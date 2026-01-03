import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educator.routes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './config/cloudinary.js'
import courseRouter from './routes/course.route.js'

const app = express()


//connect to DB
await connectDB()
await connectCloudinary()


//Middlewares
app.use(cors())
app.use(clerkMiddleware())


// Routes
app.get('/', (req,res)=>{
    res.send("Hello")
})

app.post('/clerk',express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(),courseRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})