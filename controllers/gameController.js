
const Startgame = require('../models/startGameModel');

const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
//to Create user 
const createGame = async (req, res,next) => {
  try {
  
      const newGame = new Startgame({
        game_code:req.body.game_code,
        game_type:req.body.game_type,
        max_player:req.body.max_player,
        bet_amount:req.body.bet_amount,
        pot_price:req.body.pot_price,
        players:req.body.players
      })
      await newGame.save();
      return next(createSuccess(200,"Start Game"))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};

const getAllGames = async (req, res,next) => {
  try {
      const StartedGames = await Startgame.find();
      return next(createSuccess(200, "Started Games", StartedGames))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};




module.exports = {
    createGame,getAllGames
}