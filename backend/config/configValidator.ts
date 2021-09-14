import dotenv from 'dotenv';
import buildLogger from '../utils/logger';

const logger = buildLogger(__dirname);

// Required variable name should be here to run app
const configValidator = (
  parsedConfig: dotenv.DotenvParseOutput,
  REQUIRED_VARIABLES: string[],
) => {
  const PARSED_CONFIG_KEYS_ARRAY = Object.keys(parsedConfig);
  const NOT_PROVIDED_REQUIRED_KEYS: string[] = [];
  REQUIRED_VARIABLES.forEach((REQ_KEY) => {
    const isPresent = PARSED_CONFIG_KEYS_ARRAY.includes(REQ_KEY);
    if (!isPresent) NOT_PROVIDED_REQUIRED_KEYS.push(REQ_KEY);
  });
  const areAllRequiredValuesPresent = NOT_PROVIDED_REQUIRED_KEYS.length === 0;
  if (!areAllRequiredValuesPresent) {
    logger.error(
      `Some of Required values not given in .env to work this app : \n ${NOT_PROVIDED_REQUIRED_KEYS.join(
        '\n',
      )}  `,
    );
    process.exit(0);
  }
  logger.info('All required environments variables are present');
};

export default configValidator;
