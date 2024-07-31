import mongoose, { Document, Schema } from "mongoose";

interface SMI_CatDocument extends Document {
  name: string;
}

const SMI_CatSchema = new Schema<SMI_CatDocument>(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
  },
  {
    collection: "catgeory",
  }
);

const catgeory =
  mongoose.models.catgeory ||
  mongoose.model<SMI_CatDocument>("catgeory", SMI_CatSchema, "catgeory");

export default catgeory;
