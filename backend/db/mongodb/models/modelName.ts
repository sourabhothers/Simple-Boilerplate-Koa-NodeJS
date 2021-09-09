import { model, Schema } from "mongoose";

export const modelNameSchema = new Schema({
  // prop : { type: String },
  // prop2: { type: Number, required: true },
});

const modelName = model(" modelNames", modelNameSchema);

export default modelName;
