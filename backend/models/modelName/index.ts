import buildValidator from "../validator";
import buildMakeModelName from "./modelName";
import modelSchema, { IModelName } from "./modelName.schema";

const modelNameValidator = buildValidator<IModelName>(modelSchema);

const makeModelName = buildMakeModelName(modelNameValidator);

export default makeModelName;
