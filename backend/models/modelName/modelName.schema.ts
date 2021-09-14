import { validatorSchemaType } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IModelName {
  // key: string;
}

const modelNameSchema: validatorSchemaType<IModelName> = {
  type: 'object',
  properties: {},
  additionalProperties: false,
};

export default modelNameSchema;
