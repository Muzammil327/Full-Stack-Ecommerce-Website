import mongoose, { Document, Schema } from "mongoose";

interface SMI_PlatformDocument extends Document {
  name: string;
  shipping: number;
}

const SMI_PlatformSchema = new Schema<SMI_PlatformDocument>({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 500,
  },
},
{
  collection: "platform",
});

const platform =
  mongoose.models.platform ||
  mongoose.model<SMI_PlatformDocument>("platform", SMI_PlatformSchema, "platform");

export default platform;
