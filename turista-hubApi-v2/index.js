import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingTourRoute from './routes/bookingTour.js'
import bookingHouseRoute from './routes/bookingHouse.js'
import bookingCarRoute from './routes/bookingCar.js'
import bookingBoatRoute from './routes/bookingBoat.js'


import placeRoute from './routes/houses.js'
import carRoute from './routes/cars.js'
import translatorRoute from './routes/translator.js'
import boatRoute from './routes/boats.js'
import searchRoute from './routes/search.js'
import paymentRoute from './routes/payment.js'



dotenv.config()


const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin:true,
    credentials:true
}

// Database connection  with mdb

mongoose.set('strictQuery' , false)
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log("MongoDB connected successfully!");
        } catch (err) {
          console.error("Error connecting to MongoDB", err);
        }
      };
      


// for testing 
app.get('/', (req, res) => {
    res.send('API is workin')
})

// Middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/api/v1/tours' , tourRoute)
app.use('/api/v1/users' , userRoute)
app.use('/api/v1/auth' , authRoute)
app.use('/api/v1/reviews' , reviewRoute)
app.use('/api/v1/bookingTour' , bookingTourRoute)
app.use('/api/v1/bookingHouse' , bookingHouseRoute)
app.use('/api/v1/bookingCar' , bookingCarRoute)
app.use('/api/v1/bookingBoat' , bookingBoatRoute)

app.use('/api/v1/houses' , placeRoute)
app.use('/api/v1/cars' , carRoute)
app.use('/api/v1/translator' , translatorRoute)
app.use('/api/v1/boats' , boatRoute)
app.use('/api/v1/search' , searchRoute)
app.use('/api/v1/payment' , paymentRoute)





app.listen(port, () => {
    connect()
    console.log("server listening on port ", port);
})
