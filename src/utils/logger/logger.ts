import type {
  configLoggerType,
  transportFunctionType,
} from 'react-native-logs';
import { logger } from 'react-native-logs';
import type { LogFile, LogFileConfig } from './logger-file-transport.ts';
import {
  createFileTransport,
  logFileManager,
} from './logger-file-transport.ts';

// 日志级别定义
// 注意：必须包含 'log' 级别，以便 patchConsole 可以映射 console.log
const levels = {
  debug: 0,
  log: 1, // 添加 log 级别，映射到 console.log
  info: 2,
  warn: 3,
  error: 4,
} as const;

// 日志配置选项
export interface LoggerOptions {
  /** 是否启用文件日志 */
  enableFileLog?: boolean;
  /** 文件日志配置 */
  fileLogConfig?: Partial<LogFileConfig>;
}

// 保存原生 console 方法的引用（在 patchConsole 之前）
const originalConsole = {
  log: console.log.bind(console),
  debug: console.debug.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
};

// 控制台传输函数
const consoleTransport: transportFunctionType<object> = props => {
  const { msg, level, extension } = props;
  const logMsg = extension ? `${msg} ${extension}` : msg;

  // 使用保存的原生 console 方法，避免无限循环
  switch (level.text) {
    case 'debug':
      originalConsole.debug(logMsg);
      break;
    case 'log':
      originalConsole.log(logMsg);
      break;
    case 'info':
      originalConsole.info(logMsg);
      break;
    case 'warn':
      originalConsole.warn(logMsg);
      break;
    case 'error':
      originalConsole.error(logMsg);
      break;
    default:
      originalConsole.log(logMsg);
  }
};

// 组合传输：控制台 + 文件
// 使用数组形式的传输，react-native-logs 会自动调用所有传输
const createCombinedTransport = (
  enableFileLog: boolean,
): transportFunctionType<object>[] => {
  const transports: transportFunctionType<object>[] = [];

  // 始终添加控制台传输
  transports.push(consoleTransport);

  // 如果启用文件日志，添加文件传输
  if (enableFileLog) {
    transports.push(createFileTransport());
  }

  return transports;
};

// 创建日志实例的函数
const createLoggerInstance = (options: LoggerOptions = {}) => {
  const { enableFileLog = true, fileLogConfig } = options;

  // 如果提供了文件配置，更新文件管理器配置
  if (fileLogConfig) {
    logFileManager.updateConfig(fileLogConfig);
  }

  const transports = createCombinedTransport(enableFileLog);

  // 日志配置
  const config: configLoggerType<
    transportFunctionType<object>[],
    keyof typeof levels
  > = {
    levels,
    severity: __DEV__ ? 'debug' : 'log', // 开发环境显示所有日志，生产环境只显示 log 及以上
    transport: transports.length > 0 ? transports : undefined,
    async: true,
    dateFormat: 'time',
    printLevel: true,
    printDate: true,
    enabled: true,
  };

  return logger.createLogger(config);
};

// 创建默认日志实例（启用文件日志）
const log = createLoggerInstance({ enableFileLog: true });

/**
 * 使用 react-native-logs 的 patchConsole 方法拦截 console
 * 这会将 console.log/info/warn/error/debug 映射到日志系统
 *
 * 映射关系：
 * - console.log -> log.log
 * - console.debug -> log.debug
 * - console.info -> log.info
 * - console.warn -> log.warn
 * - console.error -> log.error
 */
log.patchConsole();

// 导出日志实例和工具方法
export default log;

// 导出文件管理器
export { logFileManager };

// 导出文件管理方法
export const logger_utils = {
  // 文件管理方法
  getLogFiles: () => logFileManager.getLogFiles(),
  readLogFile: (filePath: string) => logFileManager.readLogFile(filePath),
  clearAllLogs: () => logFileManager.clearAllLogs(),
  getLogDir: () => logFileManager.getLogDir(),
};

// 导出类型
export type Logger = typeof log;
export type LogLevel = keyof typeof levels;
export type { LogFile, LogFileConfig };
