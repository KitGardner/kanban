import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const BoardListSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    boardId: { type: ObjectId, ref: "Board", required: true },
    creatorId: { type: ObjectId, ref: "Profile", required: true },
    tasksList: [{ type: ObjectId, ref: "Task" }],
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
