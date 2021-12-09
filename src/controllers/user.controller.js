const express = require("express");

const User = require("../models/user.model");
const sendMail = require("../utils/sendmail");

const router = express.Router();

router.post("/", async(req, res) => {
    try{
        const user = await User.create(req.body);

        sendMail("a@a.com", `${user.email}`, `Welcome to ABC system ${user.first_name} ${user.last_name}`,
        `Hi ${user.first_name} Please confirm your email address`,
        `Hi ${user.first_name} Please confirm your email address`,
       );
     

        return res.status(201).json({user});
    } catch(e){
        return res.status(500).json({status: "Failed", message: e.message});
    }
})


router.post("/:mul", async(req, res) => {
    try{
        const user = await User.create(req.body);

        const to_array = [
            "a@a.com",
            "b@b.com",
            "c@c.com",
            "d@d.com",
            "e@e.com"
        ]

        const to_String = to_array.join(",");

        sendMail(
            "a@a.com", 
            to_String, 
            `Welcome to ABC system ${user.first_name} ${user.last_name}`,
            `Hi ${user.first_name} Please confirm your email address`,
            `Hi ${user.first_name} Please confirm your email address`,
       );
      

        return res.status(201).json({user});
    } catch(e){
        return res.status(500).json({status: "Failed", message: e.message});
    }
})


router.get("/", async (req, res) => {
    try{
         const page =+req.query.page || 1;
         const size =+req.query.size || 2;

        
        
         const skip = (page - 1) * size;

        const users = await User.find().skip(skip).limit(size).lean().exec();
       

        const totalPages =  Math.ceil(await User.find().countDocuments() / size) 
        

        
        return res.json({users, totalPages});
    } catch(e) {
        return res.status(500).json({status: "Failed", message: e.message});

    }
})

module.exports = router;