
const Wallet = require('../models/walletModel');

const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
//to Create user 
const addAmount = async (req, res,next) => {
  try {

      const newWallet = new Wallet({
      amount:req.body.amount
      })
      await newWallet.save();
      return next(createSuccess(200,"amount added"))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};

const getAllamount = async (req, res,next) => {
  try {
      const getAllamount = await Wallet.find();
      return next(createSuccess(200, "present amounts", getAllamount))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};
const getWallet = async (req, res, next) => {
    try {
        const getAmount = await Wallet.findById(req.params.id);
        if (!getAmount) {
            return next(createError(404, "User Not Found"));
        }
        return next(createSuccess(200, "Single wallet",getAmount));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
}
const updateWallet = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updateAmount = await Wallet.findByIdAndUpdate(id, req.body);
        if (!updateAmount) {
            return next(createError(404, "User Not Found"));
        }
        return next(createSuccess(200, "amount updated",updateAmount));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
}
//delete user
const deleteWallet = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deleteWallet = await Wallet.findByIdAndDelete(id);
        if (!deleteWallet) {
            return next(createError(404, "wallet Not Found"));
        }
        return next(createSuccess(200, "wallet removed",deleteWallet));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
} 
module.exports = {
    addAmount,getAllamount,getWallet,updateWallet,deleteWallet 
}