import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something wrong on creating List..." });
  }
};
