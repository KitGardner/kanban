import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const BoardSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: ObjectId, ref: "Profile", required: true },
    boardLists: [{ type: ObjectId, ref: "BoardList" }],
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
