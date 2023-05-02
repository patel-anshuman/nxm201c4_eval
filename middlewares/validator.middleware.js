require('dotenv').config();

const validator = async (req,res,next) => {
    try {
        const IP = req.body.ip;
        const regex = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
        const validIP = regex.test(IP);
        if(validIP===true){
            next();
        } else {
            res.status(400).send({msg: "Invalid IP Address"});
        }
    } catch (err) {
        console.log({msg: err.message});
        res.status(400).send({msg: err.message});
    }
}

module.exports = {validator};