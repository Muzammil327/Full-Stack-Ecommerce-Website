import mongoose, { Document, Schema } from "mongoose";

interface SMI_ItemDocument extends Document {
  name: string;
  subCategoryId: mongoose.Schema.Types.ObjectId;
  catgeoryId: mongoose.Schema.Types.ObjectId;
}

const SMI_ItemSchema = new Schema<SMI_ItemDocument>(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
    catgeoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "catgeory" }],
    subCategoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "subcatgeory" }],
  },
  {
    collection: "item",
  }
);

const item =
  mongoose.models.item ||
  mongoose.model<SMI_ItemDocument>("item", SMI_ItemSchema, "item");

export default item;
