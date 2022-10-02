//acquirng router
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
  } = require("./verifyToken");


//register user with bcrypt and jwt 
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        // check if user already exist
        const oldUser = await User.findOne({ email: req.body.email });
        if (oldUser) return res.status(400).json("User already exists");

        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},  process.env.JWT_SECRET , {expiresIn: "113d"});
        const {password, ...info} = user._doc;
        res.status(200).json({...info, accessToken});
    } catch (err) {
        return res.status(500).json('err');
    }
}
);

//login user with googleId and jwt
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password");

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},  process.env.JWT_SECRET , {expiresIn: "113d"});
        const {password, ...info} = user._doc;
        res.status(200).json({...info, accessToken});
        // lastLogin: Date.now() after login
        user.lastLogin = Date.now();
        await user.save();
    } catch (err) {
        res.status(500).json(err);
    }
}); 

 

//login or register user with googleId and email and jwt
router.post("/googlelogin", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},  process.env.JWT_SECRET , {expiresIn: "13d"});
            const {password, ...info} = user._doc;
            res.status(200).json({...info, accessToken});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                imageUrl: req.body.imageUrl,
                googleId: req.body.googleId,
            });
            const user = await newUser.save();
            const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},  process.env.JWT_SECRET , {expiresIn: "13d"});
            const {password, ...info} = user._doc;
            res.status(200).json({...info, accessToken});
            // lastLogin: Date.now() after login
            user.lastLogin = Date.now();
            await user.save();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//get user by id

router.get("/:id", async (req,res)=>{

    const user = await User.findById(req.params.id);
    //const {passwordHash , updatedAt,  ...other} = user._doc;

    try{
        if(!user){
            res.status(404).json({
                success: false,
                message : "User not found with this id!"
            });
        } else{
            res.status(200).json({
                data: user,
                message: "User is captured",
                success: true
            });
        }
    } catch(err){
        res.status(500).json(err);
    }
});



//delete user
router.delete("/:id",verifyToken,verifyTokenAndAuthorization, async(req,res)=>{

    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            res.status(400).json({
                success: false,
                message: "User id doesn't exist"
            });
        } else{
            res.status(200).json({
                success: true,
                message: "User successfully deleted!"
            });
        }
    } catch(err){
        res.status(500).json(err);
    }

});

//update user
router.put("/:id",verifyToken,verifyTokenAndAuthorization ,async(req,res)=>{

    //if user wants to update password
    //if tries to modify password
    if(req.body.passwordHash){
        try{    
            const salt = await bcrypt.genSalt(10);
            req.body.passwordHash = await bcrypt.hash(req.body.passwordHash, salt);
        } catch(err){
                return res.status(500).json(err);
        }
    }
    //updating other details of user
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new : true}
        );
        if(!updatedUser){
            res.status(400).json("User not found");
        } else{
            res.status(200).json({
                data : updatedUser,
                message: "Successfully updated",
                success: true
            });
        }
        
    } catch(err){
        res.status(500).json(err)
    }


});





module.exports = router