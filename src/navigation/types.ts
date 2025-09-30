import type {
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import type { Paths } from './paths';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  [Paths.home]: undefined;
  [Paths.detail]: undefined;
};
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
