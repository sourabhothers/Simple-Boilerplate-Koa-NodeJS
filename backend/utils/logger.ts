import winston, { LoggerOptions } from 'winston';
import path from 'path';

// Create log file in log directory based on Todays date(UTC:00)
const LOG_DIRECTORY = path.resolve(__dirname, '../logs');

const date = new Date();
const logFileName = `${`0${date.getUTCDate()}`.substr(-2)}-${`0${
  date.getUTCMonth() + 1
}`.substr(-2)}-${date.getUTCFullYear()}.log`;

// SHow default log file path
// eslint-disable-next-line no-console
console.info(`Log directory is : ${LOG_DIRECTORY}`);

const buildLogger = (__filename: string, label?: string): winston.Logger => {
  let logLabel =
    __filename.split('/').slice(-1)[0].split('.js')[0] || 'DEFAULT';

  if (label) {
    logLabel = label;
  }

  const logConfiguration: LoggerOptions = {
    transports: [
      new winston.transports.Console({
        consoleWarnLevels: [],
        format: winston.format.combine(
          winston.format.label({ label: logLabel }),
          winston.format.timestamp({ format: 'DD-MMM-YYYY HH:mm:ss' }),
          winston.format.printf(
            (info) =>
              `${info.level}: ${[info.timestamp]}: [${info.label}] ${
                info.message
              }`,
          ),
        ),
      }),
      new winston.transports.File({
        filename: `${LOG_DIRECTORY}/${logFileName}`,
        format: winston.format.combine(
          winston.format.label({ label }),
          winston.format.timestamp({ format: 'DD-MMM-YYYY HH:mm:ss' }),
          winston.format.printf(
            (info) =>
              `${info.level}: ${[info.timestamp]}: [${info.label}] ${
                info.message
              }`,
          ),
        ),
      }),
    ],
    level: 'silly',
  };

  const logger = winston.createLogger(logConfiguration);
  return logger;
};

export default buildLogger;
