import { validatorSchemaType } from "../../types";

export interface IModelName {
  // key: string;
}

const modelSchema: validatorSchemaType<IModelName> = {
  type: "object",
  properties: {},
  additionalProperties: false,
};

export default modelSchema;
