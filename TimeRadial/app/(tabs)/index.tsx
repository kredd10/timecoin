import { StyleSheet, Platform, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Calendar from 'expo-calendar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update clock every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Request calendar permissions and show calendar selection
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Found calendars:', calendars);
        
        // Show calendar selection dialog
        Alert.alert(
          'Select Calendars',
          'Choose which calendars to display',
          calendars.map((calendar: Calendar.Calendar) => ({
            text: calendar.title,
            onPress: () => console.log('Selected calendar:', calendar.title)
          }))
        );
      }
    })();

    return () => clearInterval(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.clockContainer}>
        <ThemedText style={styles.timeText}>
          {currentTime.toLocaleTimeString()}
        </ThemedText>
        <ThemedText style={styles.dateText}>
          {currentTime.toLocaleDateString()}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockContainer: {
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 24,
  },
}); 