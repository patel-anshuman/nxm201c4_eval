const {Router} = express();
const redisClient = require('../helpers/redis.server');
const {auth} = require('../middlewares/auth.middleware');
const {auth} = require('../middlewares/validator.middleware');
import fetch from 'node-fetch';
const {SearchModel} = require('../models/searchlist.model');
const ipRouter = Router();

ipRouter.post('/location',auth,validator, async (req,res) => {
    const IP = req.body.ip;
    try {
        redisClient.get(IP, async (err, result) => {
            if (err) {
              console.error(err);
            } else {
              console.log(result); // Prints "value"
              if(result){
                res.status(200).send({"IP Address": IP, "City": result});
              } else {
                const response = await fetch(`https://ipapi.co/${IP}/city/`);
                const city = await response.text();
                console.log(body);
                redisClient.set(IP, city, 'EX', 60 * 60 * 6);
                //save search to DB

                const searchData = await SearchModel.findOne({userID: req.body.userID});
                if(!searchData){
                    const newSearchData = new SearchModel({userID: req.body.userID, searches: [city]});
                    await newSearchData.save();
                } else {
                    const newSearches = searchData["searches"];
                    newSearches.push(city);
                    await SearchModel.findOneAndUpdate({userID: req.body.userID}, {searches: newSearches});
                }
                
                //send response to user
                res.status(200).send({"IP Address": IP, "City": city});
              }
            }
          });
    } catch (err) {
        console.log({msg: err.message});
    }
});

module.exports = ipRouter;