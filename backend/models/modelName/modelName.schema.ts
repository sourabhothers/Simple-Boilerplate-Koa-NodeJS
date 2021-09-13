import { validatorSchemaType } from "../../types";

export interface IModelName {
  // key: string;
}

const modelNameSchema: validatorSchemaType<IModelName> = {
  type: "object",
  properties: {},
  additionalProperties: false
};

export default modelNameSchema;
