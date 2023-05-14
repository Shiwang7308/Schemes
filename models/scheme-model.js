const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "name is require"],
    uniqe: true,
  },
  description: {
    type: String,
    
  },
  
    // image: {
    //     type: String,
    //     default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FhTmohm_transparent-back
    // },
    category: {
        type: String,
        // required: [true, "category is require"],
    },
    city : {
        type: String,
        // required: [true, "city is require"],
    },
    state : {
        type: String,
        // required: [true, "state is require"],
    },
  
});

const schemaModel = mongoose.model("SchemeData", schemeSchema);

module.exports = schemaModel;
