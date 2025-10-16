This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

- windws 下需要配置：
  - https://kirillzyusko.github.io/react-native-keyboard-controller/docs/troubleshooting#filename-longer-than-260-characters

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using pnpm
pnpm start
# start with reset-cache
pnpm start --reset-cache
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using pnpm
pnpm android
# 指定当前架构
pnpm android --active-arch-only
```

### For iOS

```bash
# using pnpm
pnpm ios
# 指定模拟器
pnpm ios --simulator 'iPhone 15 Pro'
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Features

## 📝 日志系统

本项目已集成 `react-native-logs` 日志库，提供统一的日志管理功能。

**类似 electron-log**：自动拦截 `console` 方法，无需导入即可使用！

### 快速使用

**直接使用 console（推荐）**

无需导入任何模块，直接使用即可：

```typescript
// 调试信息（仅开发环境）
console.log('调试信息', { data: 'some data' });

// 普通信息
console.info('用户登录', { userId: '123' });

// 警告信息
console.warn('警告信息', { message: 'warning' });

// 错误信息
console.error('错误信息', error);
```

### 日志级别映射

| Console 方法 | 级别 | 开发环境 | 生产环境 |
|-------------|------|----------|----------|
| `console.log` | log | ✅ 显示 | ✅ 显示 |
| `console.debug` | debug | ✅ 显示 | ❌ 隐藏 |
| `console.info` | info | ✅ 显示 | ✅ 显示 |
| `console.warn` | warn | ✅ 显示 | ✅ 显示 |
| `console.error` | error | ✅ 显示 | ✅ 显示 |

### 特性

- ✅ **自动拦截 console**：类似 electron-log，无需导入
- ✅ **文件日志**：自动保存到文件，支持大小限制和自动轮转
- ✅ **日志查看器**：内置 UI 查看和管理日志文件
- ✅ 支持多种日志级别
- ✅ 生产环境自动过滤 debug 日志
- ✅ 支持结构化数据记录
- ✅ 异步日志处理
- ✅ TypeScript 支持

### 文件日志

日志会自动保存到文件：

- **文件位置**: `Documents/logs/`
- **文件大小限制**: 1MB（可配置）
- **文件数量限制**: 5 个（可配置）
- **自动轮转**: 文件超过大小自动创建新文件
- **自动清理**: 超过数量自动删除最旧文件

查看日志文件：

```typescript
import { logger_utils } from '@/utils/logger';

// 获取所有日志文件
const files = await logger_utils.getLogFiles();

// 读取日志文件
const content = await logger_utils.readLogFile(files[0].path);

// 清除所有日志
await logger_utils.clearAllLogs();
```

或者使用内置的日志查看器（在"我的"页面点击"查看日志文件"）。

Android 模拟器中的路径,使用 adb pull[app-2025-10-14T14-33-16-893Z.log](../../../Desktop/data/user/0/com.demoproject/files/logs/app-2025-10-14T14-33-16-893Z.log)
```bssh
# 拉取整个日志目录到 Mac
adb pull /data/user/0/com.demoproject/files/logs ~/Desktop/logs

# 或者拉取单个文件
adb pull /data/user/0/com.demoproject/files/logs/app-2025-10-14T14-35-51-259Z.log ~/Desktop/

# 没权限用这个
adb shell "run-as com.demoproject tar -czf - /data/user/0/com.demoproject/files/logs" | tar -xzf - -C ~/Desktop/
```

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
