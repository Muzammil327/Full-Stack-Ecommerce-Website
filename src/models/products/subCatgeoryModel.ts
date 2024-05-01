import mongoose, { Document, Schema, Types } from "mongoose";

interface productSubCategoryDocument extends Document {
  title: string;
  categoryId: Types.ObjectId;
}

const productSubCatgeorySchema =
  new mongoose.Schema<productSubCategoryDocument>({
    title: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "productCatgeory",
      required: true,
    },
  });

export const productSubCatgeory =
  mongoose.models.productSubCatgeory ||
  mongoose.model<productSubCategoryDocument>(
    "productSubCatgeory",
    productSubCatgeorySchema
  );

export default productSubCatgeory;
