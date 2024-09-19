
const Version = require('../models/versionModel');

const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
//to Create user 
const createVersion = async (req, res,next) => {
  try {
  
      const newversion = new Version({
        android_minimum_version:req.body.android_minimum_version,
        android_latest_version:req.body.android_latest_version,
        ios_minimum_version:req.body.ios_minimum_version,
        ios_latest_version:req.body.ios_latest_version
      })
      await newversion.save();
      return next(createSuccess(200,"version Created"))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};

const getAllVersions = async (req, res,next) => {
  try {
      const versions = await Version.find();
      return next(createSuccess(200, "all Versions", versions))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};
const getVersion = async (req, res, next) => {
  try {
      const version = await Version.findById(req.params.id);
      if (!version) {
          return next(createError(404, "version Not Found"));
      }
      return next(createSuccess(200, "Single version",version));
  } catch (error) {
      return next(createError(500, "Internal Server Error1"))
  }
}
const updateVersion= async (req, res, next) => {
  try {
      const {id} = req.params;
      const version = await Version.findByIdAndUpdate(id, req.body);
      if (!version) {
          return next(createError(404, "version Not Found"));
      }
      const updatedVersion=await Version.findById(id);
      res.status(200).json(updatedVersion);
      return next(createSuccess(200, "version Updated",version));
  } catch (error) {
      return next(createError(500, "Internal Server Error1"))
  }
}



module.exports = {
   createVersion,getAllVersions,getVersion,updateVersion
}