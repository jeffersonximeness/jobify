import 'express-async-errors'
import cors from 'cors'
import express from 'express'

import connectDB from './db/connect.js'

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/v1', (req, res) => {
    res.json({ msg: 'Welcome!' })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch (error){
        console.log(error)
    }
}

start()