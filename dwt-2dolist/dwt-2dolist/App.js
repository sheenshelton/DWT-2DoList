import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button, Alert, ImageBackground, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import TaskList from './components/TaskList';
import TextInputWithButton from './components/TextInputWithButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocation();
    loadTasksFromStorage(); // Load tasks from AsyncStorage on component mount
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location permission denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const addTask = async (text) => {
    const newTask = { id: tasks.length + 1, text };
    setTasks([...tasks, newTask]);

    // Save updated task list to AsyncStorage
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    // Save updated task list to AsyncStorage
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };

  const updateTask = async (id, newText) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(updatedTasks);

    // Save updated task list to AsyncStorage
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };

  const sendSMS = async () => {
    if (location) {
      const { result } = await SMS.sendSMSAsync(
        ['recipientPhoneNumber'],
        `Your current location is: ${location.coords.latitude}, ${location.coords.longitude}`
      );
      console.log(result);
    } else {
      Alert.alert('Location not available');
    }
  };

  // Function to load tasks from AsyncStorage
  const loadTasksFromStorage = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      if (tasksJson !== null) {
        setTasks(JSON.parse(tasksJson));
      }
    } catch (error) {
      console.error('Error loading tasks from AsyncStorage:', error);
    }
  };

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'flex-end' }}>
        <Text style={styles.title}>To Do List</Text>
        <Text style={styles.dateText}>Date Accessed: April 3, 2024</Text>
        <TextInputWithButton buttonText="Add Task" onSubmit={addTask} />
        <Button title="Send SMS with Location" onPress={sendSMS} color="#6A5ACD" />
        <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontStyle: 'italic',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  dateText: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
});

