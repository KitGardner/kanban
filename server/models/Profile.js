import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
  number: { type: String, required: true },
  type: { type: String, enum: ["cell", "home", "work"], default: "cell", lowercase: true }
});


const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    phones: [PhoneSchema],
    _queryable: { type: Boolean, default: true }
    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Profile.pre("find", function (next) {
//   if (!this._queryable) {
//     delete this.email;
//   }
//   next();
// });


export default Profile;
