import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const CommentSchema = new Schema(
  {
    comment: { type: String, required: true },
    creator: { type: ObjectId, ref: "Profile", required: true },
    taskId: { type: ObjectId, ref: "Task", required: true },
    boardId: { type: ObjectId, ref: "Board", required: true },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
