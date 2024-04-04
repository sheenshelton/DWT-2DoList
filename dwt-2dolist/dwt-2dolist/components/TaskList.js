import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onDelete, onUpdate }) {
  return (
    <View style={{ marginTop: 20 }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </View>
  );
}
