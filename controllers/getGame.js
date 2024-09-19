
const  Getgame= require('../models/getGameModel');

const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
//to Create user 
const addCode = async (req, res,next) => {
  try {

      const gamecode = new Getgame({
        game_code:req.body.game_code
      })
      await gamecode.save();
      return next(createSuccess(200,"game code added"))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};

const getAllcode = async (req, res,next) => {
  try {
      const getAllgamecode = await Getgame.find();
      return next(createSuccess(200, "present game code", getAllgamecode))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};
const getcode = async (req, res, next) => {
    try {
        const getgamecode = await Getgame.findById(req.params.id);
        if (!getgamecode) {
            return next(createError(404, "User Not Found"));
        }
        return next(createSuccess(200, "Single code",getgamecode));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
}
module.exports = {
    addCode,getAllcode,getcode
}