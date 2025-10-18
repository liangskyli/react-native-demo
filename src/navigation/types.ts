import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  EventMapBase,
  NavigationListBase,
  NavigatorScreenParams,
  StaticConfig,
  TypeBag,
  TypedNavigator,
} from '@react-navigation/native';
import type {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { NavigationState, ParamListBase } from '@react-navigation/routers';
import type { ComponentType } from 'react';
import type { Paths } from './paths';

export type HomeTabParamList = {
  [Paths.home]: undefined;
  [Paths.my]: undefined;
};

export type RootNativeStackParamList = {
  [Paths.login]: undefined;
  [Paths.homeTabBar]?: NavigatorScreenParams<HomeTabParamList>;
  [Paths.detail]: { id: string };
  [Paths.webView]: { uri: string };
  [Paths.virtualList]: { type: 'list1' | 'list2' };
  [Paths.logViewer]: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootNativeStackScreenProps<keyof RootNativeStackParamList>
  >;
export type RootNativeStackScreenProps<
  RouteName extends keyof RootNativeStackParamList,
  NavigatorID extends string | undefined = undefined,
> = NativeStackScreenProps<RootNativeStackParamList, RouteName, NavigatorID>;

export type RootNativeStackNavigationProp<
  RouteName extends keyof RootNativeStackParamList,
  NavigatorID extends string | undefined = undefined,
> = RootNativeStackScreenProps<RouteName, NavigatorID>['navigation'];
export type RootNativeStackRouteProp<
  RouteName extends keyof RootNativeStackParamList,
  NavigatorID extends string | undefined = undefined,
> = RootNativeStackScreenProps<RouteName, NavigatorID>['route'];

export type ScreenRouteConfig<
  ParamList extends ParamListBase,
  ScreenOptions extends {},
  Navigator extends ComponentType<any> = ComponentType<any>,
  NavigatorID extends string | undefined = undefined,
> = Parameters<
  TypedNavigator<
    TypeBag<
      ParamList,
      NavigatorID,
      NavigationState<ParamList>,
      ScreenOptions,
      EventMapBase,
      NavigationListBase<ParamList>,
      Navigator
    >,
    StaticConfig<
      TypeBag<
        ParamList,
        NavigatorID,
        NavigationState<ParamList>,
        ScreenOptions,
        EventMapBase,
        NavigationListBase<ParamList>,
        Navigator
      >
    >
  >['Screen']
>[0];

export type ScreenRouteList = ScreenRouteConfig<
  RootNativeStackParamList,
  NativeStackNavigationOptions
>[];
