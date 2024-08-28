import mongoose, { Document, Schema } from "mongoose";

interface SMI_CartDocument extends Document {
  orderId: mongoose.Schema.Types.ObjectId;
  userName: string;
  contactNumber: number;
  returnReason: string;
  productCondition: string;
  createdAt: Date;
}

const SMI_CartSchema = new Schema<SMI_CartDocument>(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    contactNumber: {
      type: Number,
      default: 1,
    },
    userName: {
      type: String,
      required: true,
    },
    returnReason: {
      type: String,
      required: true,
    },
    productCondition: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "formreturnreplace",
  }
);

const returnReplace =
  mongoose.models.returnReplace ||
  mongoose.model("returnReplace", SMI_CartSchema, "returnReplace");

export default returnReplace;
