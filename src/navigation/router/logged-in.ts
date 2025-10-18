import { Paths } from '@/navigation/paths.ts';
import TabBar from '@/navigation/tab-bar.tsx';
import type { ScreenRouteList } from '@/navigation/types.ts';

export const loggedInRouteList: ScreenRouteList = [
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
  {
    name: Paths.virtualList,
    options: { title: '虚拟列表' },
    getComponent: () => require('@/screens/virtual-list').default,
  },
  {
    name: Paths.logViewer,
    options: { title: '日志查看器' },
    getComponent: () => require('@/screens/log-viewer').default,
  },
];
