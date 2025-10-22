import Button from '@/components/button';
import SafeScreen from '@/components/safe-screen';
import Toast from '@/components/toast';
import VirtualList from '@/components/virtual-list';
import type { LogFile } from '@/utils/logger/logger.ts';
import { logger_utils } from '@/utils/logger/logger.ts';
import { useEffect, useState } from 'react';
import { Alert, Share, Text, TouchableOpacity, View } from 'react-native';
import LoadingIcon from '../../components/loading/loading-icon.tsx';

const LogViewerScreen = () => {
  const [logFiles, setLogFiles] = useState<LogFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<LogFile | null>(null);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // 加载日志文件列表
  const loadLogFiles = async () => {
    try {
      setRefreshing(true);
      const files = await logger_utils.getLogFiles();
      setLogFiles(files);
    } catch (error) {
      console.error('加载日志文件列表失败', error);
      Toast.show('加载失败');
    } finally {
      setRefreshing(false);
    }
  };

  // 读取日志文件内容
  const readLogFile = async (file: LogFile) => {
    try {
      setLoading(true);
      setSelectedFile(file);
      const content = await logger_utils.readLogFile(file.path);

      // 将内容按行分割，用于 VirtualList 渲染
      const lines = content.split('\n').filter(line => line.trim() !== '');
      setLogLines(lines);
    } catch (error) {
      console.error('读取日志文件失败', error);
      Toast.show('读取失败');
    } finally {
      setLoading(false);
    }
  };

  // 分享日志文件
  const shareLogFile = async (file: LogFile) => {
    try {
      const content = await logger_utils.readLogFile(file.path);
      await Share.share({
        message: content,
        title: file.name,
      });
      console.info('日志文件已分享', { file: file.name });
    } catch (error) {
      console.error('分享日志文件失败', error);
    }
  };

  // 清除所有日志
  const clearAllLogs = () => {
    Alert.alert('确认清除', '确定要删除所有日志文件吗？此操作不可恢复。', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        style: 'destructive',
        onPress: async () => {
          try {
            await logger_utils.clearAllLogs();
            setLogFiles([]);
            setSelectedFile(null);
            setLogLines([]);
            Toast.show('已清除所有日志');
            console.info('所有日志文件已清除');
          } catch (error) {
            console.error('清除日志失败', error);
            Toast.show('清除失败');
          }
        },
      },
    ]);
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // 格式化日期
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  useEffect(() => {
    loadLogFiles();
  }, []);

  // 渲染日志文件列表项
  const renderLogFileItem = ({ item }: { item: LogFile }) => (
    <TouchableOpacity
      className="mb-2 rounded-lg border border-gray-300 bg-white p-4"
      onPress={() => readLogFile(item)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800">
            {item.name}
          </Text>
          <Text className="mt-1 text-sm text-gray-500">
            {formatFileSize(item.size)} • {formatDate(item.mtime)}
          </Text>
        </View>
        <TouchableOpacity
          className="ml-2 rounded bg-blue-500 px-3 py-1"
          onPress={() => shareLogFile(item)}
        >
          <Text className="text-sm text-white">分享</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // 渲染日志内容行
  const renderLogLine = ({ item }: { item: string }) => (
    <View className="border-b border-gray-100 px-3 py-1">
      <Text className="font-mono text-xs text-gray-700" selectable>
        {item}
      </Text>
    </View>
  );

  return (
    <SafeScreen
      className="flex-1 bg-gray-100"
      edges={['left', 'right', 'bottom']}
    >
      <View className="flex-1 p-4">
        {/* 头部操作栏 */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold">日志文件</Text>
          <View className="flex-row gap-2">
            <Button
              onPress={loadLogFiles}
              className="h-[36px] px-3"
              textClassName="text-sm"
            >
              刷新
            </Button>
            <Button
              onPress={clearAllLogs}
              className="h-[36px] bg-red-500 px-3"
              textClassName="text-sm"
              disabled={logFiles.length === 0}
            >
              清除全部
            </Button>
          </View>
        </View>

        {/* 日志目录信息 */}
        <View className="mb-4 rounded-lg bg-blue-50 p-3">
          <Text className="text-sm text-gray-600">
            日志目录: {logger_utils.getLogDir()}
          </Text>
          <Text className="mt-1 text-sm text-gray-600">
            文件数量: {logFiles.length}
          </Text>
        </View>

        {/* 日志文件列表 */}
        <View className="mb-4 flex-1">
          <Text className="mb-2 text-base font-semibold">文件列表</Text>
          {logFiles.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-500">暂无日志文件</Text>
            </View>
          ) : (
            <VirtualList
              data={logFiles}
              renderItem={renderLogFileItem}
              keyExtractor={item => item.path}
              refreshing={refreshing}
              onRefresh={loadLogFiles}
            />
          )}
        </View>

        {/* 日志内容查看器 */}
        {selectedFile && (
          <View className="flex-1 rounded-lg border border-gray-300 bg-white">
            <View className="border-b border-gray-300 bg-gray-50 p-3">
              <Text className="font-semibold text-gray-800">
                {selectedFile.name}
              </Text>
              <Text className="mt-1 text-xs text-gray-500">
                共 {logLines.length} 行
              </Text>
            </View>
            {loading ? (
              <View className="flex-1 items-center justify-center">
                <LoadingIcon
                  visibleAnimated={true}
                  width={40}
                  height={40}
                  color="#3b82f6"
                />
              </View>
            ) : logLines.length === 0 ? (
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-500">日志内容为空</Text>
              </View>
            ) : (
              <VirtualList
                data={logLines}
                renderItem={renderLogLine}
                keyExtractor={(item, index) => `log-line-${index}`}
                initialScrollIndex={logLines.length - 1}
              />
            )}
          </View>
        )}
      </View>
    </SafeScreen>
  );
};

export default LogViewerScreen;
