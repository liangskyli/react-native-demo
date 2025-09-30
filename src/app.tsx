import ApplicationNavigator from '@/navigation';
import { StrictMode, useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

function App() {
  // 添加启动屏幕隐藏逻辑
  useEffect(() => {
    const init = async () => {
      // 模拟初始化任务
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <StrictMode>
      <ApplicationNavigator />
    </StrictMode>
  );
}
export default App;
