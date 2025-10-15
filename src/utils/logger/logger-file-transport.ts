import * as RNFS from '@dr.pogodin/react-native-fs';
import type { transportFunctionType } from 'react-native-logs';

// 日志文件配置
export type LogFileConfig = {
  /** 日志目录路径 */
  logDir: string;
  /** 日志文件名前缀 */
  fileNamePrefix: string;
  /** 单个日志文件最大大小（字节），默认 1MB */
  maxFileSize: number;
  /** 最多保留的日志文件数量，默认 5 个 */
  maxFiles: number;
  /** 是否启用文件日志，默认 true */
  enabled: boolean;
};

// 默认配置
const DEFAULT_CONFIG: LogFileConfig = {
  logDir: `${RNFS.DocumentDirectoryPath}/logs`,
  fileNamePrefix: 'app',
  maxFileSize: 1 * 1024 * 1024, // 1MB
  maxFiles: 5,
  enabled: true,
};

export type LogFile = {
  name: string;
  path: string;
  size: number;
  mtime: Date;
};

// 日志文件管理器
class LogFileManager {
  private config: LogFileConfig;
  private currentLogFile: string = '';
  private writeQueue: string[] = [];
  private isWriting: boolean = false;
  private initialized: boolean = false;

  constructor(config: Partial<LogFileConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * 初始化日志目录
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // 创建日志目录
      const dirExists = await RNFS.exists(this.config.logDir);
      if (!dirExists) {
        await RNFS.mkdir(this.config.logDir);
      }

      // 获取当前日志文件
      await this.getCurrentLogFile();

      // 清理旧日志文件
      await this.cleanOldLogFiles();

      this.initialized = true;
      console.log('[LogFileManager] 初始化完成', {
        logDir: this.config.logDir,
        currentFile: this.currentLogFile,
      });
    } catch (error) {
      console.error('[LogFileManager] 初始化失败', error);
    }
  }

  /**
   * 获取当前日志文件
   */
  private async getCurrentLogFile(): Promise<string> {
    if (this.currentLogFile) {
      // 检查当前文件是否超过大小限制
      const fileExists = await RNFS.exists(this.currentLogFile);
      if (fileExists) {
        const stat = await RNFS.stat(this.currentLogFile);
        if (stat.size < this.config.maxFileSize) {
          return this.currentLogFile;
        }
      }
    }

    // 如果没有当前文件，尝试查找目录中最新的未满文件
    if (!this.currentLogFile) {
      const existingFile = await this.findLatestLogFile();
      if (existingFile) {
        this.currentLogFile = existingFile;
        return this.currentLogFile;
      }
    }

    // 在创建新文件之前，先清理旧文件（保留 maxFiles - 1 个，为新文件留出空间）
    await this.cleanOldLogFiles();

    // 创建新的日志文件
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.currentLogFile = `${this.config.logDir}/${this.config.fileNamePrefix}-${timestamp}.log`;

    return this.currentLogFile;
  }

  /**
   * 查找最新的未满日志文件
   */
  private async findLatestLogFile(): Promise<string | null> {
    try {
      const dirExists = await RNFS.exists(this.config.logDir);
      if (!dirExists) return null;

      const files = await RNFS.readdir(this.config.logDir);

      // 过滤出日志文件
      const logFiles = files.filter(name =>
        name.startsWith(this.config.fileNamePrefix),
      );

      if (logFiles.length === 0) return null;

      // 获取文件信息并排序
      const filesWithInfo = await Promise.all(
        logFiles.map(async name => {
          const path = `${this.config.logDir}/${name}`;
          const stat = await RNFS.stat(path);
          return {
            name,
            path,
            size: stat.size,
            mtime: stat.mtime,
          };
        }),
      );

      // 按修改时间排序（最新的在前）
      const sortedFiles = filesWithInfo.sort(
        (a, b) => b.mtime.getTime() - a.mtime.getTime(),
      );

      // 查找第一个未满的文件
      const latestFile = sortedFiles.find(
        file => file.size < this.config.maxFileSize,
      );

      return latestFile ? latestFile.path : null;
    } catch (error) {
      console.error('[LogFileManager] 查找最新日志文件失败', error);
      return null;
    }
  }

  /**
   * 写入日志到文件
   */
  async writeLog(message: string): Promise<void> {
    if (!this.config.enabled) return;

    // 添加到写入队列
    this.writeQueue.push(message);

    // 如果正在写入，等待当前写入完成
    if (this.isWriting) return;

    // 开始写入
    await this.processWriteQueue();
  }

  /**
   * 处理写入队列
   */
  private async processWriteQueue(): Promise<void> {
    if (this.writeQueue.length === 0) return;

    this.isWriting = true;

    try {
      // 确保已初始化
      if (!this.initialized) {
        await this.initialize();
      }

      // 获取当前日志文件
      const logFile = await this.getCurrentLogFile();

      // 批量写入所有待写入的日志
      const logs = this.writeQueue.splice(0);
      const content = logs.join('\n') + '\n';

      // 追加写入文件
      await RNFS.appendFile(logFile, content, 'utf8');
    } catch (error) {
      console.error('[LogFileManager] 写入日志失败', error);
    } finally {
      this.isWriting = false;

      // 如果队列中还有日志，继续处理
      if (this.writeQueue.length > 0) {
        await this.processWriteQueue();
      }
    }
  }

  /**
   * 清理旧的日志文件
   */
  private async cleanOldLogFiles(): Promise<void> {
    try {
      const dirExists = await RNFS.exists(this.config.logDir);
      if (!dirExists) return;

      // 读取日志目录中的所有文件
      const files = await RNFS.readdir(this.config.logDir);

      // 过滤出日志文件
      const logFiles = files.filter(name =>
        name.startsWith(this.config.fileNamePrefix),
      );

      // 获取文件信息并排序
      const filesWithInfo = await Promise.all(
        logFiles.map(async name => {
          const path = `${this.config.logDir}/${name}`;
          const stat = await RNFS.stat(path);
          return {
            name,
            path,
            size: stat.size,
            mtime: stat.mtime,
          };
        }),
      );

      // 按修改时间排序（最新的在前）
      const sortedFiles = filesWithInfo.sort(
        (a, b) => b.mtime.getTime() - a.mtime.getTime(),
      );

      // 如果文件数量达到或超过限制，删除最旧的文件
      // 使用 >= 确保在创建新文件前就清理，保持文件数量 <= maxFiles
      if (sortedFiles.length >= this.config.maxFiles) {
        // 保留最新的 maxFiles - 1 个文件，为新文件留出空间
        const filesToDelete = sortedFiles.slice(this.config.maxFiles - 1);
        for (const file of filesToDelete) {
          await RNFS.unlink(file.path);
          console.log('[LogFileManager] 删除旧日志文件', file.name);
        }
      }
    } catch (error) {
      console.error('[LogFileManager] 清理旧日志文件失败', error);
    }
  }

  /**
   * 获取所有日志文件列表
   */
  async getLogFiles(): Promise<LogFile[]> {
    try {
      const dirExists = await RNFS.exists(this.config.logDir);
      if (!dirExists) return [];

      const files = await RNFS.readdir(this.config.logDir);

      // 过滤出日志文件
      const logFiles = files.filter(name =>
        name.startsWith(this.config.fileNamePrefix),
      );

      const filesWithInfo = await Promise.all(
        logFiles.map(async name => {
          const path = `${this.config.logDir}/${name}`;
          const stat = await RNFS.stat(path);
          return {
            name,
            path,
            size: stat.size,
            mtime: stat.mtime,
          };
        }),
      );

      // 按修改时间排序（最新的在前）
      return filesWithInfo.sort(
        (a, b) => b.mtime.getTime() - a.mtime.getTime(),
      );
    } catch (error) {
      console.error('[LogFileManager] 获取日志文件列表失败', error);
      return [];
    }
  }

  /**
   * 读取日志文件内容
   */
  async readLogFile(filePath: string): Promise<string> {
    try {
      return await RNFS.readFile(filePath, 'utf8');
    } catch (error) {
      console.error('[LogFileManager] 读取日志文件失败', error);
      return '';
    }
  }

  /**
   * 删除所有日志文件
   */
  async clearAllLogs(): Promise<void> {
    try {
      const dirExists = await RNFS.exists(this.config.logDir);
      if (!dirExists) return;

      const files = await RNFS.readdir(this.config.logDir);

      for (const name of files) {
        if (name.startsWith(this.config.fileNamePrefix)) {
          await RNFS.unlink(`${this.config.logDir}/${name}`);
        }
      }

      this.currentLogFile = '';
      console.log('[LogFileManager] 已清除所有日志文件');
    } catch (error) {
      console.error('[LogFileManager] 清除日志文件失败', error);
    }
  }

  /**
   * 获取日志目录路径
   */
  getLogDir(): string {
    return this.config.logDir;
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<LogFileConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// 创建单例实例
export const logFileManager = new LogFileManager();

/**
 * 创建文件传输函数
 */
export const createFileTransport = (
  config?: Partial<LogFileConfig>,
): transportFunctionType<object> => {
  if (config) {
    logFileManager.updateConfig(config);
  }

  return (props: {
    msg: string;
    rawMsg: unknown;
    level: { severity: number; text: string };
    extension?: string | null;
    options?: object;
  }) => {
    const { msg, level } = props;
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.text.toUpperCase()}] ${msg}`;

    // 异步写入日志文件
    logFileManager.writeLog(logMessage).catch(error => {
      console.error('[FileTransport] 写入日志失败', error);
    });
  };
};
