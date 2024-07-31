import mongoose, { Document, Schema } from "mongoose";

interface SMI_ProductDocument extends Document {
  name: string;
  Sdescription: string;
  Ldescription: string;
  slug: string;
  pSlug: string;
  price: number;
  dPrice: number;
  quantity: number;
  image: string;
  slider: [string];
  status: string;
  freeDelivery: boolean;
  bestPrice: boolean;
  feature: boolean;
  top: boolean;
  PlatformId: mongoose.Schema.Types.ObjectId;
  categoryId: mongoose.Schema.Types.ObjectId;
  subCategoryId: mongoose.Schema.Types.ObjectId;
  itemId: mongoose.Schema.Types.ObjectId;
  sizeId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  colorId: mongoose.Schema.Types.ObjectId;
  like: mongoose.Schema.Types.ObjectId;
  dislike: mongoose.Schema.Types.ObjectId;
}

const SMI_ProductSchema = new Schema<SMI_ProductDocument>({
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
  pSlug: {
    type: String,
    required: [true, "Enter your Product Purchase Slug."],
    lowercase: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Enter your Product Price."],
  },
  dPrice: {
    type: Number,
    required: [true, "Enter your Product Price."],
  },
  quantity: {
    type: Number,
    required: [true, "Enter your Product Quantity."],
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
    {
      value: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      label: {
        type: String,
      },
    },
  ],
  categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "catgeory" }],
  subCategoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "subcatgeory" }],
  itemId: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
  sizeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "size" }],
  PlatformId: [{ type: mongoose.Schema.Types.ObjectId, ref: "platform" }],
  colorId: [{ type: mongoose.Schema.Types.ObjectId, ref: "color" }],
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
},
{
  collection: "product",
});

const product =
  mongoose.models.product ||
  mongoose.model<SMI_ProductDocument>("product", SMI_ProductSchema, "product");

export default product;
