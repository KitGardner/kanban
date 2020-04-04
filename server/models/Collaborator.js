import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CollaboratorSchema = new Schema(
  {
    profile: { type: ObjectId, ref: "Profile", required: true },
    board: { type: ObjectId, ref: "Board", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CollaboratorSchema.index({ profile: 1, board: 1 }, { unique: true });

export default CollaboratorSchema;