
const Endgame = require('../models/endGameModel');

const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
//to Create user 
const endgame = async (req, res,next) => {
  try {
  
      const endgame = new Endgame({
        game_id:req.body.game_id,
        pot_price:req.body.pot_price,
        winner_id:req.body.winner_id
      })
      await endgame.save();
      return next(createSuccess(200,"end Game"))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};

const endedGames = async (req, res,next) => {
  try {
      const EndedGames = await Endgame.find();
      return next(createSuccess(200, "ended Games", EndedGames))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};




module.exports = {
    endgame,endedGames
}