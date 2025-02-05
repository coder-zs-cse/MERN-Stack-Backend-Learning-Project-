const express = require("express")
require('dotenv').config()
const dbConfig = require("./config/dbConfig.js")
const doctorRouter = require('./routes/doctorRouter')
const app = express()
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const stripeRouter = require('./routes/stripeRouter')
const cors = require("cors")
const port = process.env.port || 5000



app.use(cors())

app.use('/api/v1/stripe/',stripeRouter)

app.use(express.json())

app.use('/api/v1/user/',userRouter)
app.use('/api/v1/admin/',adminRouter)
app.use('/api/v1/doctor/',doctorRouter)

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
})
 
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})    