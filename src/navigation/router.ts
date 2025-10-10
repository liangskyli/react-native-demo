import TabBar from '@/navigation/tab-bar.tsx';
import LoginScreen from '@/screens/login';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Paths } from './paths.ts';
import type { RootNativeStackParamList, ScreenRouteConfig } from './types.ts';

export type ScreenRouteConfigList = ScreenRouteConfig<
  RootNativeStackParamList,
  NativeStackNavigationOptions
>[];
export const commonScreenRouteConfigList: ScreenRouteConfigList = [
  {
    name: Paths.webView,
    options: { title: '' },
    getComponent: () => require('@/screens/webview').default,
  },
];
export const noLoginScreenRouteConfigList: ScreenRouteConfigList = [
  {
    name: Paths.login,
    options: { title: '登录', headerShown: false },
    component: LoginScreen,
  },
];
export const hasLoginScreenRouteConfigList: ScreenRouteConfigList = [
  {
    name: Paths.homeTabBar,
    options: { title: '首页', headerShown: false },
    component: TabBar,
  },
  {
    name: Paths.detail,
    options: { title: '详情页' },
    getComponent: () => require('@/screens/detail').default,
  },
];
