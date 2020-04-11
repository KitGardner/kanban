import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: ObjectId, ref: "Profile", required: true },
    boardListId: { type: ObjectId, ref: "BoardList", required: true },
    boardId: { type: ObjectId, ref: "Board", required: true },
    comments: [{ type: ObjectId, ref: "Comment" }],
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
