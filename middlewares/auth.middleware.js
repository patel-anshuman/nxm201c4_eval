const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req,res,next) => {
    try {
        redis.get("blacklist_token", (err, result) => {
            if (err) {
              console.error(err);
            } else {
              console.log(result); // Prints "value"
              res.status(400).send({msg : "Login first"});
            }
        });
        const token = req.headers?.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded){
            req.body.userID = decoded.userID;
            next();
        } else {
            res.status(400).send({msg : "Wrong Credentials!!"});
        }
    } catch (err) {
        console.log({msg: err.message});
        res.status(400).send({msg: err.message});
    }
}

module.exports = {auth};