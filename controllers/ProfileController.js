
const Profile = require('../models/profile');

const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
//to Create user 
const profileCreated = async (req, res,next) => {
  try {
  
      const profile = new Profile({
        name:req.body.name
      })
      await profile.save();
      return next(createSuccess(200,"profile created"))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};

const findProfile = async (req, res,next) => {
  try {
      const profile = await Profile.find();
      return next(createSuccess(200, "find profiles", profile))
  } catch (error) {
      return next(createError(500, "Something went wrong"));
  }
};

const getProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return next(createError(404, "profile Not Found"));
        }
        return next(createSuccess(200, "Single profile",profile));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
}

const updateprofile = async (req, res, next) => {
    try {
        const {id} = req.params;
        const profile = await Profile.findByIdAndUpdate(id, req.body);
        if (!profile) {
            return next(createError(404, "profile Not Found"));
        }
        return next(createSuccess(200, "profile Details Updated",profile));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
}
const deleteProfile = async (req, res, next) => {
    try {
        const {id} = req.params;
        const profile = await Profile.findByIdAndDelete(id);
        if (!profile) {
            return next(createError(404, "User Not Found"));
        }
        return next(createSuccess(200, "profile Deleted",profile));
    } catch (error) {
        return next(createError(500, "Internal Server Error1"))
    }
} 




module.exports = {
    profileCreated,findProfile,getProfile,updateprofile,deleteProfile
}