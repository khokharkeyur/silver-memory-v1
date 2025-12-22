import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  title: { type: String },
});

const Test = mongoose.model("Test", testSchema);
export default Test;
