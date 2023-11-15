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

export const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json("Listing not found!");
  }
  if (req.user.id !== listing.userRef) {
    return res.status(401).json("Yon can only delete your own listings!");
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json("Listing has been deleted!");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something wrong on Deleting listings...",
    });
  }
};
