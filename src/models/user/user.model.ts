import mongoose from "mongoose";
import { Password } from "../../services/password";
import { UserAttrs, UserDoc, UserModel } from "./user.types";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    tagName: {
      type: String,
    },
    image: {
      type: String,
    },
    locationLatitude: {
      type: Number,
    },
    onboardingComplete: {
      type: Boolean,
    },
    verified: {
      type: Boolean,
    },
    locationLongitude: {
      type: Number,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.newUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
