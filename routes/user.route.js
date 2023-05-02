const {Router} = express();
const redisClient = require('../helpers/redis.server');
require('dotenv').config();
const {UserModel} = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userRouter = Router();

userRouter.post('/signup', async (req,res) => {
    const {name, email, password} = req.body;
    try {
        isUser = UserModel.findOne({email});
        if(isUser) return res.status(400).send({msg: "User already registered!! Kindly Login"});
        bcrypt.hash(password, 5, async (err, hash) => {
            const payload = {name, email, password: hash};
            const user = new UserModel(payload);
            await user.save();
            res.status(200).send({msg: "User registration successful"});
        });
    } catch (err) {
        console.log({msg: err.message});
    }
});

userRouter.post('/login', async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = UserModel.findOne({email});
        if(!user) return res.status(400).send({msg: "User not registered!! Kindly register & then login"});
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                const token = jwt.sign({ userID: email }, process.env.JWT_SECRET );
                res.status(200).send({ msg: "Login Successful", "token": token});
            } else {
                res.status(400).send({msg: err.message});
            }
        });
    } catch (err) {
        console.log({msg: err.message});
        res.status(400).send({msg: err.message});
    }
});

userRouter.get('/logout', async (req,res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    try {
        redisClient.set("blacklist_token", token );
        res.status(200).send({ msg: "User logged out"});
    } catch (err) {
        console.log({msg: err.message});
        res.status(400).send({msg: err.message});
    }
});

module.exports = userRouter;