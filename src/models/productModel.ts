import mongoose, { Document, Schema } from "mongoose";

interface ProductsDocument extends Document {
  name: string;
  description: string;
  slug: string;
  category: string;
  subCategory: string;
  platform: string;
  items: string;
  price: number;
  discountprice: number;
  quantity: number;
  deliveryCharge: number;
  image: string;
  status: string;
  feature: boolean;
  bestPrice: boolean;
  freeDelivery: boolean;
  top: boolean;
  keywords: [];
  slider: [];
  product: [];
  like: [];
  dislike: [];
}
const productsSchema = new Schema<ProductsDocument>({
  name: {
    type: String,
    required: [true, "Enter your Product Name."],
  },
  description: {
    type: String,
    required: [true, "Enter your Product Description."],
  },
  slug: {
    type: String,
    // required: [true, "Enter your Product Slug."],
    lowercase: true,
  },
  category: {
    type: String,
    // enum: ["men", "women", "electronics"],
    lowercase: true,
    // required: [true, "Enter your Product Catgeory."],
  },
  subCategory: {
    type: String,
    // required: [true, "Enter your Product Sub Catgeory."],
    // enum: ["clothing", "accessories"],
    lowercase: true,
  },
  platform: {
    type: String,
    // required: [true, "Enter your Product Platform."],
    enum: ["markaz", "hhcdropshipping", "sadadropship"],
    lowercase: true,
  },
  items: {
    type: String,
    // required: [true, "Enter your Product Sub Catgeory."],
    // enum: [
    //   "airpods",
    // ],
    lowercase: true,
  },
  price: {
    type: Number,
    // required: [true, "Enter your Product Price."],
  },
  deliveryCharge: {
    type: Number,
    // required: [true, "Enter your Product Price."],
  },
  discountprice: {
    type: Number,
    // required: [true, "Enter your Product Discount Price."],
  },
  quantity: {
    type: Number,
    // required: [true, "Enter your Product Quantity in Stock."],
  },
  image: {
    type: String,
    // required: [true, "Enter your Product Image."],
  },
  keywords: {
    type: [String],
  },
  slider: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["active", "out of stock"],
    default: "active",
  },
  freeDelivery: {
    type: Boolean,
    default: false,
  },
  bestPrice: {
    type: Boolean,
    default: false,
  },
  feature: {
    type: Boolean,
    default: false,
  },
  top: {
    type: Boolean,
    default: false,
  },
  // variants: [
  //   {
  //     size: { type: String },
  //     quantity: { type: Number },
  //     color: { type: String },
  //     material: { type: String },
  //     price: { type: Number },
  //     stockQuantity: { type: Number },
  //     dimensions: {
  //       length: { type: Number },
  //       width: { type: Number },
  //       height: { type: Number },
  //     },
  //     weight: { type: Number },
  //   },
  // ],
  product: [
    {
      value: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      label: {
        type: String,
      },
    },
  ],
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

const Products =
  mongoose.models.Products ||
  mongoose.model<ProductsDocument>("Products", productsSchema);

export default Products;
