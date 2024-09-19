
const Player = require('../models/playerModel');

const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
//to Create user 
const playerDetail = async (req, res,next) => {
  try {
  
      const newplayer = new Player({
        max_player: req.body.max_player,
        bet_amount : req.body.bet_amount
      })
      await newplayer.save();
      return next(createSuccess(200," details Created"))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};

const getdetails = async (req, res,next) => {
  try {
      const details = await Player.find();
      return next(createSuccess(200, "all details", details))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};

module.exports = {
  playerDetail,getdetails
}