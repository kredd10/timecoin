import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RadialClock from './components/RadialClock';
import { getTodayEvents } from './services/CalendarService';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCalendarEvents();
  }, []);

  const loadCalendarEvents = async () => {
    try {
      const events = await getTodayEvents();
      setTasks(events);
    } catch (error) {
      Alert.alert(
        'Calendar Access Error',
        'Please grant calendar permissions to use this app',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Today's Schedule</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <View style={styles.clockContainer}>
          <RadialClock tasks={tasks} />
          <Text style={styles.taskCount}>
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} today
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  clockContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCount: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
}); 