const express = require('express')
const router = new express.Router()
const validator = require("validator")
const Users = require("../models/user")

const app = express();
app.use(router);

router.post("/checkusername", async(req, res) => {
    try{
        if(req.body.userName){
            var userName = req.body.userName.toLowerCase();
            regexUsername = /^[a-z0-9]+$/gm;
            const result = regexUsername.test(userName)
            if(!result){ throw new Error("Invalid Username")}
            else{
            const check =  await Users.exists( {userName} )
            if(!check){
                res.status(200).send({
                    code : 200,
                    status : "success",
                    exists : check
                })
            }else if(check) throw new Error("Username already exists! Please try another username.")
            }
            }else{
              throw new Error("Username required for check")
            }
        }
    catch(error){
        res.status(400).send({
            code : 400,
            status : "failed",
            message : error.message
        });
    }
    
})

module.exports = router