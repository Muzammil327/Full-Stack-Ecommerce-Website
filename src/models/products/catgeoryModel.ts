import mongoose, { Document } from "mongoose";

interface productCategoryDocument extends Document {
  title: string;
}

const productCatgeorySchema = new mongoose.Schema<productCategoryDocument>({
  title: {
    type: String,
    required: true,
  },
});

export const productCatgeory =
  mongoose.models.productCatgeory ||
  mongoose.model<productCategoryDocument>(
    "productCatgeory",
    productCatgeorySchema
  );

export default productCatgeory;
