import mongoose, { Document, Schema } from "mongoose";

interface ASK_QUESTIONDocument extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

const ASK_QUESTIONSchema = new Schema<ASK_QUESTIONDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "askquestion",
  }
);

const askquestion =
  mongoose.models.askquestion ||
  mongoose.model("askquestion", ASK_QUESTIONSchema, "askquestion");

export default askquestion;
