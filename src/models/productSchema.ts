import { Schema, model } from "mongoose";

const productSchema = new Schema({
  //name, price, description, quantitiy, shipping, sold, slug
 // missing: image, category
  name: {
    type: String,
    //unique: true, to handle the duplicated products
    required: true,
    trim: true,
    minlength: [3, "product name must be at least 3 character long"],
    maxlength: [300, "product name must be at most 300 character long"],
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },

  price: {
    type: Number,
    // required: true,
    trim: true,
  },

  quantity: {
    type: Number,
    // required: true,
    trim: true,
  },

  sold: {
    type: Number,
    // required: true,
    trim: true,
  },

  shipping: {
    type: Number,
    default: 0, // 0 -> free 
  },

  description: {
    type: String,
    // required: true,
    trim: true,
    minlength: [5, "product description must be at least 5 character long"],
  },
}, {timestamps: true});

//create the model/collections
export const Product = model("Products", productSchema);
