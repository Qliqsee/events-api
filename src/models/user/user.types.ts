import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
export interface UserAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// An interface that describes the properties
// that a User Document has
export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  id: string;
  dateOfBirth: string;
  locationLatitude: number;
  locationLongitude: number;
  tagName: string;
  onboardingComplete: boolean;
  verified: boolean;
  image: string;
}

// An interface that describes the properties
// that a User Model has
export interface UserModel extends mongoose.Model<UserDoc> {
  newUser(attrs: UserAttrs): UserDoc;
}
