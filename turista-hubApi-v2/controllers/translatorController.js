import Translator from "../models/Translator.js";

// Create new translator
export const createTranslator = async (req, res) => {
  const newTranslator = new Translator(req.body);

  try {
    const savedTranslator = await newTranslator.save();
    res.status(200).json({
      success: true,
      message: "Successfully created translator",
      data: savedTranslator,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create translator, try again",
      error:err.message
    });
  }
};

// Update translator
export const updateTranslator = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTranslator = await Translator.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated translator",
      data: updatedTranslator,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update translator",
    });
  }
};

// Delete translator
export const deleteTranslator = async (req, res) => {
  const id = req.params.id;

  try {
    await Translator.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted translator",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete translator",
    });
  }
};

// Get single translator
export const getSingleTranslator = async (req, res) => {
  const id = req.params.id;

  try {
    const translator = await Translator.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfully fetched translator",
      data: translator,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Translator not found",
    });
  }
};

// Get all translators with pagination
export const getAllTranslators = async (req, res) => {
  const page = parseInt(req.query.page) || 0;

  try {
    const translators = await Translator.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: translators.length,
      message: "Successfully fetched all translators",
      data: translators,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch translators",
    });
  }
};

// Search translators by filters
export const getTranslatorsBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const language = req.query.language;
  const minRating = parseFloat(req.query.rating) || 0;
  const certified = req.query.isCertified === "true" ? true : undefined;

  const query = {
    city,
    ...(language && { languages: language }),
    ...(certified !== undefined && { isCertified: certified }),
    rating: { $gte: minRating },
  };

  try {
    const translators = await Translator.find(query).populate("reviews");

    res.status(200).json({
      success: true,
      count: translators.length,
      message: "Search results",
      data: translators,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
};

// Get top-rated translators (e.g., rating >= 4.5)
export const getTopRatedTranslators = async (req, res) => {
  try {
    const translators = await Translator.find({ rating: { $gte: 4.5 } })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successfully fetched top-rated translators",
      data: translators,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch top-rated translators",
    });
  }
};

// Count translators
export const getTranslatorCount = async (req, res) => {
  try {
    const count = await Translator.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: count,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to count translators",
    });
  }
};
