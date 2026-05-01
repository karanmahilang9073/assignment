import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
  try {
    const {about, cases} = req.body;
    let parsedCases = [];
    if (cases) {
      if (typeof cases === "string") {
        try {
          parsedCases = JSON.parse(cases);
        } catch {
          parsedCases = [];
        }
      } else {
        parsedCases = cases;
      }
    }

    const profileData = { about, cases: parsedCases};
    if (req.file) {
      profileData.profileImage = req.file.path;
    }
    const newProfile = await Profile.create(profileData);

    res.status(201).json({success: true, data: newProfile});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: error.message || "Failed to create profile"});
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Profile.findById(userId);
    if (!user) {
      return res.status(404).json({success: false, message: "not found"});
    }

    res.status(200).json({success: true, data: user});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = {};
    if (req.body.about) {
      updateData.about = req.body.about;
    }

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    if (req.body.cases) {
      try {
        updateData.cases = typeof req.body.cases === 'string' ? JSON.parse(req.body.cases) : req.body.cases;
      } catch (error) {
        console.log("Cases parse error:", error);
      }
    }

    const updated = await Profile.findByIdAndUpdate(userId, updateData, {
      returnDocument: 'after',
    });

    if (!updated) {
      return res.status(404).json({success: false, message: "Profile not found"});
    }

    res.status(200).json({success: true, data: updated});
  } catch (error) {
    console.error("updateProfile error:", error);
    res.status(500).json({success: false, message: error.message || "Failed to update profile"});
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ _id: -1 });

    res.status(200).json({success: true, data: profile});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
