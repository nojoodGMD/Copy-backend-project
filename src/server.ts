import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'

import usersRouter from './routers/userRouter'
import authRouter from './routers/authRouters'
import productsRouter from './routers/productsRoutes'
import ordersRouter from './routers/ordersRouters'
import categoriesRouter from './routers/categoryRoutes'
import apiErrorHandler from './middlewares/errorHandler'
import myLogger from './middlewares/logger'
import { connectDB } from './config/db'

connectDB()
const app: Application = express()

app.use('/public',express.static('public'))
app.use(myLogger)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:3000',credentials: true}))

app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/auth', authRouter)

app.use(apiErrorHandler)

export default app;


