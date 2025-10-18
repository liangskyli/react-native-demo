import { Paths } from '@/navigation/paths.ts';
import type { ScreenRouteList } from '@/navigation/types.ts';

export const commonRouteList: ScreenRouteList = [
  {
    name: Paths.webView,
    options: { title: '' },
    getComponent: () => require('@/screens/webview').default,
  },
];
