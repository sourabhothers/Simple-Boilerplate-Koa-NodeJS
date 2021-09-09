import mongoose from "mongoose";
import config from "../../config";
import buildLogger from "../../utils/logger";
const logger = buildLogger(__filename);
const makeDBConnection = () => {
  mongoose.connect(config.MONGO_URL, (error) => {
    if (error) {
      logger.info(
        `Mongoose couldn't connect to database due to : stack = ${error.stack}`
      );
      throw new Error(error.stack);
    }
    logger.info(`Mongoose database connected to : ${config.MONGO_URL}`);
  });
  return mongoose;
};

export default makeDBConnection();
