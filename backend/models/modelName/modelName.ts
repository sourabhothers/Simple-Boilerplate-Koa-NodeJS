import { IModelName } from "./modelName.schema";
import { IValidatorFactoryReturnFn } from "../../types";

let buildMakeModelName = function (
  studentNameValidator: IValidatorFactoryReturnFn<IModelName>
) {
  return (modelNameData: IModelName) => {
    const { validator, error } = studentNameValidator(modelNameData);

    if (error) throw new Error(error);

    return modelNameData;
  };
};

export default buildMakeModelName;
