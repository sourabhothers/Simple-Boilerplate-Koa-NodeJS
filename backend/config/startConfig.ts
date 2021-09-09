import dotenv from "dotenv";
import path from "path";

const logger = {
  info: (message: any) => console.log(message),
  error: (message: any) => console.error(message),
};

const startConfig = () => {
  return new Promise((resolve) => {
    const developmentEnvFile = path.resolve(__dirname, ".dev.env");
    const productionEnvFile = path.resolve(__dirname, ".prod.env");

    console.log(developmentEnvFile);

    if (!developmentEnvFile || !productionEnvFile) {
      logger.error(`Please provide at least one environment file (i.e. .env)`);
      process.exit(0);
    }

    // Choosing environment variable based on NODE_ENV system variable
    let chosenEnvFile: string;
    if (
      process.env.NODE_ENV?.toLocaleLowerCase() === "production" ||
      process.env.NODE_ENV?.toLocaleLowerCase() === "prod"
    ) {
      logger.info("Using NODE_ENV = production");
      chosenEnvFile = productionEnvFile;
    } else {
      logger.info("Using NODE_ENV = development");
      chosenEnvFile = developmentEnvFile;
    }

    const parsedConfig = dotenv.config({
      path: chosenEnvFile,
      debug: true,
    }).parsed;

    resolve(parsedConfig);
  });
};

export default startConfig;
