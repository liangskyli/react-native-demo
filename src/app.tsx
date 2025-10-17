import Portal from '@/components/portal';
import ApplicationNavigator from '@/navigation';
import { useUserStore } from '@/store/modules/use-user-store.ts';
import '@/styles/tailwind.css';
import '@/utils/logger/logger.ts';
import { StrictMode, useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { KeyboardProvider } from 'react-native-keyboard-controller';

function App() {
  const { initLoginStatus } = useUserStore();
  // 添加启动屏幕隐藏逻辑
  useEffect(() => {
    const init = async () => {
      await initLoginStatus();
      // 模拟初始化任务
      await new Promise(resolve => setTimeout(resolve, 10));
      console.log('应用初始化完成');
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('启动屏幕已隐藏');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StrictMode>
      <KeyboardProvider>
        <Portal>
          <ApplicationNavigator />
        </Portal>
      </KeyboardProvider>
    </StrictMode>
  );
}
export default App;
