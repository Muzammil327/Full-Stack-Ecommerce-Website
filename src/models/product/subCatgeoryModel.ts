import mongoose, { Document, Schema } from "mongoose";

interface SMI_SubcatDocument extends Document {
  name: string;
  catgeoryId: mongoose.Schema.Types.ObjectId;
}

const SMI_SubcatSchema = new Schema<SMI_SubcatDocument>(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
    catgeoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "catgeory" }],
  },
  { collection: "subcatgeory" }
);

const subcatgeory =
  mongoose.models.subcatgeory ||
  mongoose.model<SMI_SubcatDocument>(
    "subcatgeory",
    SMI_SubcatSchema,
    "subcatgeory"
  );

export default subcatgeory;
