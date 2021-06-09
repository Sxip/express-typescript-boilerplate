import { createLogger, format, transports } from 'winston'
import chalk from 'chalk'
import path from 'path'

/**
 * Logger formatter.
 * 
 * @param colorize 
 */
const formatter = (colorize: boolean) =>
  format.printf(info => {
    const content = colorize ? chalk.yellow(JSON.stringify(info)) : JSON.stringify(info)
    return `[${info.timestamp}] ${info.level}: ${info.message} ${content}`
  })

/**
 * Logger.
 */
export default createLogger({
  transports: [
    new transports.File({
      filename: path.join('./logs/error.log'),
      level: 'error',
      format: format.combine(format.timestamp(), formatter(false)),
    }),
    new transports.File({
      filename: path.join('./logs/combined.log'),
      format: format.combine(format.timestamp(), formatter(false)),
    }),
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.colorize(), formatter(true)),
    }),
  ],
})
