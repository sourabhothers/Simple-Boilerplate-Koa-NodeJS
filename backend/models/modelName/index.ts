import buildValidator from '../validator';
import buildMakeModelName from './modelName';
import modelNameSchema, { IModelName } from './modelName.schema';

const modelNameValidator = buildValidator<IModelName>(modelNameSchema);

const makeModelName = buildMakeModelName(modelNameValidator);

export default makeModelName;
