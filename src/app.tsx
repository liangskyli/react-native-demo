import Portal from '@/components/portal';
import ApplicationNavigator from '@/navigation';
import { useUserStore } from '@/store/modules/use-user-store.ts';
import '@/styles/tailwind.css';
import { StrictMode, useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

function App() {
  const { initLoginStatus } = useUserStore();
  // 添加启动屏幕隐藏逻辑
  useEffect(() => {
    const init = async () => {
      await initLoginStatus();
      // 模拟初始化任务
      await new Promise(resolve => setTimeout(resolve, 500));
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StrictMode>
      <Portal>
        <ApplicationNavigator />
      </Portal>
    </StrictMode>
  );
}
export default App;
