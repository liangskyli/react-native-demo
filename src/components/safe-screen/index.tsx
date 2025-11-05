import DefaultError from '@/components/default-error';
import ErrorBoundary from '@/components/error-boundary';
import { DefaultTheme } from '@react-navigation/native';
import type { PropsWithChildren } from 'react';
import { StatusBar } from 'react-native';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SafeScreenProps = PropsWithChildren<
  {
    readonly isError?: boolean;
    readonly onResetError?: () => void;
  } & SafeAreaViewProps
>;
function SafeScreen(props: SafeScreenProps) {
  const {
    children = undefined,
    isError = false,
    onResetError = undefined,
    ...safeAreaViewProps
  } = props;
  return (
    <SafeAreaView {...safeAreaViewProps}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={DefaultTheme.colors.background}
      />
      <ErrorBoundary onReset={onResetError}>
        {isError ? <DefaultError onReset={onResetError} /> : children}
      </ErrorBoundary>
    </SafeAreaView>
  );
}

export default SafeScreen;
