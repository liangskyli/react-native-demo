import Button from '@/components/button';
import Icon from '@/components/icon';
import KeyboardAwareView from '@/components/keyboard-aware-view';
import SafeScreen from '@/components/safe-screen';
import Toast from '@/components/toast';
import { useUserStore } from '@/store/modules/use-user-store.ts';
import { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// 手机号验证：只能输入11位数字
const validateMobile = (
  mobile: string,
): { valid: boolean; message: string } => {
  if (!mobile) {
    return { valid: false, message: '请输入手机号码' };
  }
  if (!/^[0-9]{11}$/.test(mobile)) {
    return { valid: false, message: '手机号码必须为11位数字' };
  }
  return { valid: true, message: '' };
};

// 密码验证：长度6-20，需包含数字、字母、特殊字符中至少两类
const validatePassword = (
  password: string,
): { valid: boolean; message: string } => {
  if (!password) {
    return { valid: false, message: '请输入密码' };
  }
  if (password.length < 6 || password.length > 20) {
    return { valid: false, message: '密码长度必须为6-20位' };
  }

  // 检查是否包含数字、字母、特殊字符中至少两类
  const hasNumber = /[0-9]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecial = /[^0-9a-zA-Z]/.test(password);

  const typeCount = [hasNumber, hasLetter, hasSpecial].filter(Boolean).length;

  if (typeCount < 2) {
    return {
      valid: false,
      message: '密码需包含数字、字母、特殊字符中至少两类',
    };
  }

  return { valid: true, message: '' };
};

const LoginScreen = () => {
  const { saveLoginData } = useUserStore();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordInputRef = useRef<TextInput>(null);

  const handleMobileChange = (text: string) => {
    // 只允许输入数字，最多11位
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 11);
    setMobile(numericText);
    // 清除错误提示
    if (mobileError) {
      setMobileError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // 清除错误提示
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    // 验证手机号
    const mobileValidation = validateMobile(mobile);
    if (!mobileValidation.valid) {
      setMobileError(mobileValidation.message);
      Toast.show(mobileValidation.message);
      return;
    }

    // 验证密码
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.message);
      Toast.show(passwordValidation.message);
      return;
    }

    // 验证通过，执行登录
    Toast.show('登录成功');
    saveLoginData({
      accessToken: 'accessToken',
      userInfo: { userId: '1' },
    });
  };

  return (
    <SafeScreen className="flex-1 items-center justify-between bg-white">
      <Text className="mt-10 text-lg font-semibold">欢迎登录</Text>
      <KeyboardAwareView className="w-full items-center gap-6 px-8">
        <Text className="text-2xl font-bold">登录</Text>
        <View className="w-full gap-5">
          {/* 手机号输入框 */}
          <View className="w-full gap-1">
            <TextInput
              className="h-[48px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
              onChangeText={handleMobileChange}
              value={mobile}
              placeholder="请输入手机号码"
              returnKeyType="next"
              keyboardType="number-pad"
              maxLength={11}
              onSubmitEditing={() => {
                // 失去焦点
                passwordInputRef.current?.focus();
              }}
            />
            {mobileError ? (
              <Text className="px-1 text-xs text-red-500">{mobileError}</Text>
            ) : null}
          </View>

          {/* 密码输入框 */}
          <View className="w-full gap-1">
            <View className="relative w-full">
              <TextInput
                ref={passwordInputRef}
                className="h-[48px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12"
                onChangeText={handlePasswordChange}
                value={password}
                placeholder="请输入密码"
                returnKeyType="done"
                secureTextEntry={!showPassword}
                textContentType="password"
                maxLength={20}
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                className="absolute right-0 top-0 h-[48px] w-[48px] items-center justify-center"
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Icon
                  path={showPassword ? 'eye' : 'eye-off'}
                  width={20}
                  height={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text className="px-1 text-xs text-red-500">{passwordError}</Text>
            ) : null}
            <Text className="px-1 text-xs text-gray-400">
              密码长度6-20位，需包含数字、字母、特殊字符中至少两类
            </Text>
          </View>

          {/* 登录按钮 */}
          <Button
            onPress={handleLogin}
            className="mt-4 h-[48px]"
            disabled={!mobile || !password}
          >
            登录
          </Button>
        </View>
      </KeyboardAwareView>
      <Text className="mb-6 text-sm text-gray-400">安全登录，保护隐私</Text>
    </SafeScreen>
  );
};

export default LoginScreen;
