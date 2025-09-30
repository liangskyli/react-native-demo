import type { StackNavigationOptions } from '@react-navigation/stack';
import type { ComponentType } from 'react';
import DetailScreen from '../screens/detail';
import HomeScreen from '../screens/home/index';
import { Paths } from './paths.ts';
import type { RootStackParamList } from './types.ts';

type RouteItem = {
  /**
   * Optional key for this screen. This doesn't need to be unique.
   * If the key changes, existing screens with this name will be removed or reset.
   * Useful when we have some common screens and have conditional rendering.
   */
  navigationKey?: string;
  /** 页面显示名称 */
  name: string;
  /** 路由路径 */
  path: keyof RootStackParamList;
  /** Stack.Screen 的 options 属性 */
  options?: StackNavigationOptions;
  /** 屏幕组件 */
  component: ComponentType<any>;
  /** 初始参数 */
  initialParams?: object;
  /** 获取屏幕ID的函数 */
  getId?: (params: any) => string;
};

// export const tabbarList = [];
export const otherList: RouteItem[] = [
  {
    name: '首页',
    path: Paths.home,
    options: { headerShown: false },
    component: HomeScreen,
  },
  {
    name: '详情页',
    path: Paths.detail,
    options: {},
    component: DetailScreen,
  },
];
