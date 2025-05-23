const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
    type: String,
    required: true
    },
    description: String,
    image:{
        filename: { 
            type: String, 
            default: "default-image" 
        },
        url: { 
            type: String, 
            default: "https://th.bing.com/th/id/OIP.wL69_qPF2q5alfGiRTWOhgHaDt?w=350&h=175&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        }
    },
    price: Number,
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

const listing = mongoose.model("listing",listingSchema);
module.exports = listing;