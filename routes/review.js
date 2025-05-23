const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing");
const review = require("../models/review.js");
//reviews
//post
router.post("/",async(req,res)=>{
    let listings = await listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    listings.review.push(newReview);
    await newReview.save();
    await listings.save();
    
    res.redirect(`/listing/${listings._id}`)
  
  }
  )
  //delete review route
router.delete(
    "/:reviewId",
    wrapAsync(async(req,res)=>{
      let { id, reviewId} = req.params;
      await listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});
      await review.findByIdAndDelete(reviewId);
      res.redirect(`/listing/${id}`);
  
    })
  );

  module.exports = router;