const mongoose = require("mongoose");
const mongoose_url = "mongodb://127.0.0.1:27017/wonderlust";
const initDB = require("./data")
const listing = require("../models/listing");
main()
   .then(()=>{
    console.log("connected to db");
    })
     .catch((err)=>{
    console.log(err);
    })


async function main (){
     await mongoose.connect(mongoose_url);
}

const init = async ()=>{
    await listing.insertMany(initDB.data);
    console.log("data was initialized");    
}

init();