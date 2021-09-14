import Ajv from 'ajv';
import { validatorSchemaType, IValidatorFactoryReturnFn } from '../../types';
import buildLogger from '../../utils/logger';

const logger = buildLogger(__filename);
const ajv = new Ajv({ allErrors: true });

/**
 *
 * @param schemaName
 * @returns FactoryFunction
 */
const buildValidator = <IValidationData>(
  schemaName: validatorSchemaType<IValidationData>,
) => {
  // eslint-disable-next-line no-underscore-dangle
  const _validator = ajv.compile<IValidationData>(schemaName);

  // Internal Factory function
  const factoryReturnFn: IValidatorFactoryReturnFn<IValidationData> = (
    validationData: IValidationData,
  ) => {
    _validator(validationData);
    let customError = null;
    if (_validator.errors && _validator.errors.length > 0) {
      customError = _validator.errors.map((e) => e.message).join('\n');
    }
    return { validator: _validator, error: customError };
  };
  return factoryReturnFn;
};

export default buildValidator;
