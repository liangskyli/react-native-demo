import DefaultError from '@/components/default-error';
import ErrorBoundary from '@/components/error-boundary';
import { DefaultTheme } from '@react-navigation/native';
import type { PropsWithChildren } from 'react';
import { StatusBar } from 'react-native';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

type Properties = PropsWithChildren<
  {
    readonly isError?: boolean;
    readonly onResetError?: () => void;
  } & Omit<SafeAreaViewProps, 'mode'>
>;
function SafeScreen({
  children = undefined,
  isError = false,
  onResetError = undefined,
  ...props
}: Properties) {
  return (
    <SafeAreaView {...props} mode="padding">
      <StatusBar
        barStyle="dark-content"
        backgroundColor={DefaultTheme.colors.background}
      />
      <ErrorBoundary onReset={onResetError}>
        {isError ? <DefaultError onReset={onResetError} /> : children}
      </ErrorBoundary>
    </SafeAreaView>
  );
}

export default SafeScreen;
