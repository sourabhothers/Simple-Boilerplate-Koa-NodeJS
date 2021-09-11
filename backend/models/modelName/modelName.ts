import { IModelName } from "./modelName.schema";
import { IValidatorFactoryReturnFn } from "../../types";

let buildMakeModelName = function (
  modelNameValidator: IValidatorFactoryReturnFn<IModelName>
) {
  return (modelNameData: IModelName) => {
    const { validator, error } = modelNameValidator(modelNameData);

    if (error) throw new Error(error);

    return modelNameData;
  };
};

export default buildMakeModelName;
