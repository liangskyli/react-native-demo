import Loading from '@/components/loading';
import Portal from '@/components/portal';
import ApplicationNavigator from '@/navigation';
import { useAjaxLoadingStore } from '@/store';
import { useUserStore } from '@/store/modules/use-user-store.ts';
import '@/styles/tailwind.css';
import '@/utils/logger/logger.ts';
import { StrictMode, useEffect } from 'react';
import { View } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const { isLoading } = useAjaxLoadingStore();
  const { initLoginStatus, updateIsLaunched, isLaunched } = useUserStore();
  // 添加启动屏幕隐藏逻辑
  useEffect(() => {
    const init = async () => {
      await initLoginStatus();
      // 模拟初始化任务
      await new Promise(resolve => setTimeout(resolve, 10));
      console.log('应用初始化完成');
    };

    updateIsLaunched(false);
    init().finally(async () => {
      updateIsLaunched(true);
      await BootSplash.hide({ fade: true });
      console.log('启动屏幕已隐藏');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StrictMode>
      <Portal>
        <GestureHandlerRootView>
          <KeyboardProvider>
            <SafeAreaProvider>
              <Loading visible={isLoading} />
              {isLaunched ? <ApplicationNavigator /> : <View />}
            </SafeAreaProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </Portal>
    </StrictMode>
  );
}
export default App;
