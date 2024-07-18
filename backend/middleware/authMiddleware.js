const express = require("express")
const jwt  = require("jsonwebtoken")
// const router = express.Router()


function authMiddleware(req,res,next){
    try{ 
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,async (err,decoded)=>{
            if(err){
                return res.status(401).send({
                    message: "Auth failed",
                    success: false
                })
            }
            else{
                req.body.myRole = decoded.myRole
                req.body.userId = decoded.id
            }
            next()
        })
    }
    catch(error){
        return res.status(401).send({

            message: "Server error in auth middleware",
            success: false
        })
    }
}

function doctorAuth(req,res, next){
    try {
        if(req.body.myRole!=='doctor'){
            return res.status(200).send({
                message: "You are not authorized to access this route",
                success: false
            })
        }
        next()
    } catch (error) {
        return res.status(500).send({
            message: "Server error in doctorauth",
            success: false
        })
    } 
}

function userAuth(req,res, next){
    try {
        if(req.body.myRole!=='user'){
            return res.status(200).send({
                message: "You are not authorized to access this route",
                success: false
            })
        }
        next()
    } catch (error) {
        return res.status(500).send({
            message: "Server error in doctorauth",
            success: false
        })
    }
    
}


function adminAuth(req,res, next){
    try {
        if(req.body.myRole!=='admin'){
            return res.status(200).send({
                message: "You are not authorized to access this route",
                success: false
            })
        }
        next()
    } catch (error) {
        return res.status(500).send({
            message: "Server error in doctorauth",
            success: false
        })
    }
    
}




module.exports = {authMiddleware, doctorAuth, userAuth, adminAuth}
