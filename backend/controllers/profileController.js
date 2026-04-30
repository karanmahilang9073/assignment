import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
  try {
    const { about, cases } = req.body;

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

    const profileData = {
      about,
      cases: parsedCases,
    };

    if (req.file) {
      profileData.profileImage = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const newProfile = await Profile.create(profileData);

    res.status(201).json({
      success: true,
      data: newProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Profile.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
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
      updateData.profileImage = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    if (req.body.cases) {
      updateData.cases = JSON.parse(req.body.cases);
    }

    const updated = await Profile.findByIdAndUpdate(userId, updateData, {
      returnDocument: 'after',
    });

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ _id: -1 });

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
