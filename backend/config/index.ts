import dotenv from "dotenv";
import path from "path";
import configValidator from "./configValidator";

// Main code
// const logger = buildLogger("config_index");
const logger = {
  info: (message: any) => console.log(message),
  error: (message: any) => console.error(message)
};
/**
 *
 *
 *
 *
 */
const REQUIRED_VARIABLES: string[] = ["MONGO_URL", "PORT", "HOSTNAME"];
/**
 *
 *
 *
 *
 */

const config = () => {
  const developmentConfigFile = path.resolve(
    __dirname,
    "../../../env/.dev.env"
  );
  const productionConfigFile = path.resolve(
    __dirname,
    "../../../env/.prod.env"
  );
  //
  if (!developmentConfigFile || !productionConfigFile) {
    logger.error(`Please provide at least one environment file (i.e. .env)`);
    process.exit(0);
  }

  // Choosing environment variable based on NODE_ENV system variable
  let chosenEnvFile: string;
  const isDevelopment =
    process.env.NODE_ENV?.toLocaleLowerCase() === "production" ||
    process.env.NODE_ENV?.toLocaleLowerCase() === "prod"
      ? false
      : true;

  if (!isDevelopment) {
    logger.info("Using NODE_ENV = production");
    chosenEnvFile = productionConfigFile;
  } else {
    logger.info("Using NODE_ENV = development");
    chosenEnvFile = developmentConfigFile;
  }

  const dotenvResult = dotenv.config({
    path: chosenEnvFile,
    debug: process.env.NODE_ENV === "dev"
  });

  if (dotenvResult.error) {
    logger.error(dotenvResult.error);
    process.exit(0);
  }

  const parsedConfig = dotenvResult.parsed || {};

  // Required Variables Validation
  configValidator(parsedConfig, REQUIRED_VARIABLES);

  interface INewConfig {
    LOG_DIRECTORY: string;
    NODE_ENV: string;
    MONGO_URL: string;
    PORT: number;
    HOSTNAME: string;
    CORS: boolean;
    CACHE_VIEWS: boolean;
    CLUSTER: boolean;
    DEBUG: boolean;
  }

  // Extracting values from parsedConfig
  const {
    LOG_DIRECTORY,
    NODE_ENV,
    MONGO_URL,
    PORT,
    HOSTNAME,
    CORS = "false",
    CACHE_VIEWS = "true",
    CLUSTER = "false",
    DEBUG = "false"
  } = parsedConfig;

  const newConfig: INewConfig = {
    LOG_DIRECTORY: path.resolve(__dirname, LOG_DIRECTORY || "../logs"),
    NODE_ENV: NODE_ENV?.toLocaleLowerCase() || "dev",
    MONGO_URL: MONGO_URL || "mongodb://localhost:27017/TEST_DB_1",
    PORT: +PORT || 3000,
    HOSTNAME: HOSTNAME || "localhost",
    CORS: CORS === "true" ? true : false,
    CACHE_VIEWS: CACHE_VIEWS === "true" ? true : false,
    CLUSTER: CLUSTER === "true" ? true : false,
    DEBUG: DEBUG === "true" ? true : false
  };
  return newConfig;
};

export default config();
