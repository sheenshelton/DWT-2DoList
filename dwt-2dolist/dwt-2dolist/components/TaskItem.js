import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function TaskItem({ task, onDelete, onUpdate }) {
  const [text, setText] = React.useState(task.text);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleUpdate = () => {
    onUpdate(task.id, text);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={{ marginRight: 10 }}>{task.id}.</Text>
        {isEditing ? (
          <TextInput
            style={{ flex: 1, padding: 10, borderWidth: 1 }}
            value={text}
            onChangeText={setText}
          />
        ) : (
          <Text style={{ flex: 1 }}>{task.text}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <Button title="Save" onPress={handleUpdate} />
        ) : (
          <>
            <Button title="Edit" onPress={() => setIsEditing(true)} />
            <View style={styles.buttonSpacer} />
            <Button title="Delete" onPress={() => onDelete(task.id)} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonSpacer: {
    width: 10,
  },
});

