import Button from '@/components/button';
import { useRef } from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput, View } from 'react-native';

type InputViewProps = {
  changeTextHandler: (text: string) => void;
  value: string;
  sendMessage: () => void;
} & Pick<TextInputProps, 'onFocus' | 'onBlur'>;
const InputView = (props: InputViewProps) => {
  const { changeTextHandler, value, sendMessage, ...inputProps } = props;
  const inputRef = useRef<TextInput>(null);
  return (
    <View className="flex-row items-center bg-white p-3">
      <TextInput
        {...inputProps}
        ref={inputRef}
        className="h-[40px] flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3"
        onChangeText={changeTextHandler}
        onSubmitEditing={sendMessage}
        value={value}
        placeholder="输入信息"
        returnKeyType="send"
        returnKeyLabel="发送"
        enablesReturnKeyAutomatically
        underlineColorAndroid="transparent"
      />
      <Button
        className="ml-4 h-[40px] w-[80px] items-center justify-center rounded-[8px]"
        title="按钮"
        onPress={() => {
          inputRef.current?.blur();
        }}
      />
    </View>
  );
};

export default InputView;
