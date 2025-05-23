const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const listing = require("../models/listing");
router.get("/", async (req, res) => {
  const allListings = await listing.find({});
  await res.render("listing/listings.ejs", { allListings });
});
//New Route
router.get("/new", (req, res) => {
  if(!req.isAuthenticated()){
    req.flash("error","you must be logged in to create a new listing")
     return res.redirect("/listing");
  }
  res.render("listing/new.ejs");
});
//show route
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const listings = await listing.findById(id).populate("review");
  res.render("listing/show.ejs", { listings });
});
//Create Route
router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    const newListing = new listing(req.body.listing);
    await newListing.save();
    req.flash("success", "new listing created!");
    res.redirect("/listing");
  })
);

//edit route
router.get("/:id/edit", async (req, res) => {
  let id = req.params.id;
  const listings = await listing.findById(id);
  res.render("listing/edit.ejs", { listings });
});
//update
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  await listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/${id}`);
});
//delete
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let deletedListing = await listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listing");
});

module.exports = router;
