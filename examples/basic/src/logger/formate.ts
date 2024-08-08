import chalk from 'chalk';
import { format, Logform } from 'winston';

// colors
const Color: Record<string, (text: string) => string> = {
  info: chalk.green,
  error: chalk.red,
  warn: chalk.yellow,
  debug: chalk.magentaBright,
  verbose: chalk.cyanBright,
};

// error formate
const errorFormate: Logform.FormatWrap = format((info) => {
  if (info?.level === 'error' && info instanceof Error) {
    return {
      ...info,
      message: `${info.message as string}${
        info.stack ? `\n${info.stack}` : ''
      }`,
    };
  }

  return info;
});

// pretty formate
export function prettyPrint() {
  const handlers: Logform.Format[] = [];

  // handlers.push(format.timestamp({ format: 'DD/MM/YYYY hh:mm:ss A' }));
  handlers.push(errorFormate());

  handlers.push(
    format.printf(({ level, message }) => {
      const color = Color[level] || ((text: string): string => text);

      const prefix = `${color(`${level.toUpperCase()}`)}:`;

      return `${prefix} ${message}`;
    }),
  );

  return format.combine(...handlers);
}
