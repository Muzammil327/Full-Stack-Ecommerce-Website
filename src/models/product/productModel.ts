import mongoose, { Document, Schema } from "mongoose";

interface SMI_ProductDocument extends Document {
  name: string;
  Sdescription: string;
  Ldescription: string;
  slug: string;
  price: number;
  dPrice: number;
  image: string;
  slider: [string];
  status: string;
  freeDelivery: boolean;
  bestPrice: boolean;
  feature: boolean;
  top: boolean;
  categoryId: mongoose.Schema.Types.ObjectId;
  subCategoryId: mongoose.Schema.Types.ObjectId;
  itemId: mongoose.Schema.Types.ObjectId;
  sizeId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  colorId: mongoose.Schema.Types.ObjectId;
  like: mongoose.Schema.Types.ObjectId;
  dislike: mongoose.Schema.Types.ObjectId;
}

const SMI_ProductSchema = new Schema<SMI_ProductDocument>(
  {
    name: {
      type: String,
      required: [true, "Enter your Product Name."],
      lowercase: true,
      trim: true,
    },
    Sdescription: {
      type: String,
      required: true,
      trim: true,
    },
    Ldescription: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Enter your Product Slug."],
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, "Enter your Product Price."],
    },
    dPrice: {
      type: Number,
      required: [true, "Enter your Product Price."],
    },
    image: {
      type: String,
      required: [true, "Enter your Product Image."],
    },
    slider: {
      type: [String],
      required: [true, "Enter your Slider Image."],
    },
    status: {
      type: String,
      enum: ["active", "out of stock"],
      default: "active",
    },
    freeDelivery: {
      type: Boolean,
      select: false,
      default: false,
    },
    bestPrice: {
      type: Boolean,
      select: false,
      default: false,
    },
    feature: {
      type: Boolean,
      select: false,
      default: false,
    },
    top: {
      type: Boolean,
      select: false,
      default: false,
    },
    productId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "product", default: [] },
    ],
    sizeId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "size", default: [] },
    ],
    categoryId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "catgeory", default: [] },
    ],
    subCategoryId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "subcatgeory", default: [] },
    ],
    itemId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "item", default: [] },
    ],
    colorId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "color", default: [] },
    ],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    collection: "product",
  }
);

const product =
  mongoose.models.product ||
  mongoose.model<SMI_ProductDocument>("product", SMI_ProductSchema, "product");

export default product;
