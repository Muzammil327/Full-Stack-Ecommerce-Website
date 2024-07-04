import mongoose, { Document, Schema } from "mongoose";

interface ProductsDocument extends Document {
  name: string;
  Sdescription: string;
  Ldescription: string;
  slug: string;
  category: string;
  subCategory: string;
  platform: string;
  items: string;
  price: number;
  image: string;
  keywords: [string];
  slider: [string];
  status: string;
  freeDelivery: boolean;
  bestPrice: boolean;
  feature: boolean;
  top: boolean;
  productId: mongoose.Schema.Types.ObjectId;
  like: mongoose.Schema.Types.ObjectId;
  dislike: mongoose.Schema.Types.ObjectId;
}

const productsSchema = new Schema<ProductsDocument>({
  name: {
    type: String,
    required: [true, "Enter your Product Name."],
  },
  Sdescription: {
    type: String,
    required: true,
  },
  Ldescription: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: [true, "Enter your Product Slug."],
    lowercase: true,
  },
  category: {
    type: String,
    // enum: ["men", "women", "electronics"],
    lowercase: true,
    required: [true, "Enter your Product Catgeory."],
  },
  subCategory: {
    type: String,
    // enum: ["clothing", "accessories"],
    lowercase: true,
    required: [true, "Enter your Product Sub Catgeory."],
  },
  platform: {
    type: String,
    required: [true, "Enter your Product Platform."],
    enum: [
      "markaz",
      "hhcdropshipping",
      "sadadropship",
      "shoes",
    ],
    lowercase: true,
  },
  items: {
    type: String,
    required: [true, "Enter your Item Keyword."],
    // enum: [
    //   "airpods",
    // ],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, "Enter your Product Price."],
  },
  image: {
    type: String,
    required: [true, "Enter your Product Image."],
  },
  keywords: {
    type: [String],
    required: [true, "Enter your Keywords."],
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
    default: false,
    select: false,
  },
  bestPrice: {
    type: Boolean,
    default: false,
    select: false,
  },
  feature: {
    type: Boolean,
    default: false,
    select: false,
  },
  top: {
    type: Boolean,
    default: false,
    select: false,
  },
  productId: [
    {
      value: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      label: {
        type: String,
      },
    },
  ],
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const Product =
  mongoose.models.products ||
  mongoose.model<ProductsDocument>("products", productsSchema);

export default Product;
