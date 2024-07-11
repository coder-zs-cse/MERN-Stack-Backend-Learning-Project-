const express = require("express")
require('dotenv').config()
const dbConfig = require("./config/dbConfig.js")
const app = express()
const userRouter = require('./routes/userRouter')
const cors = require("cors")
const port = process.env.port || 5000

app.use(cors())
app.use(express.json())

app.use('/api/v1/user/',userRouter)

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