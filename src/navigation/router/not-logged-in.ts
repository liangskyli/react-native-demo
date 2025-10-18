import { Paths } from '@/navigation/paths.ts';
import type { ScreenRouteList } from '@/navigation/types.ts';
import LoginScreen from '@/screens/login';

export const notLoggedInRouteList: ScreenRouteList = [
  {
    name: Paths.login,
    options: { title: '登录', headerShown: false },
    component: LoginScreen,
  },
];
