import React from 'react';
import { View, TextInput, Button } from 'react-native';

export default function TextInputWithButton({ buttonText, onSubmit }) {
  const [text, setText] = React.useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <TextInput
        style={{ flex: 1, padding: 10, borderWidth: 1 }}
        value={text}
        onChangeText={setText}
        placeholder="Enter task"
      />
      <Button title={buttonText} onPress={handleSubmit} />
    </View>
  );
}
