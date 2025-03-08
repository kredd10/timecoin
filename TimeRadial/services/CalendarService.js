import * as Calendar from 'expo-calendar';
import moment from 'moment';

export const requestCalendarPermissions = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  return status === 'granted';
};

export const getCalendars = async () => {
  try {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    return calendars;
  } catch (error) {
    console.error('Error fetching calendars:', error);
    return [];
  }
};

export const getTodayEvents = async () => {
  try {
    const hasPermission = await requestCalendarPermissions();
    if (!hasPermission) {
      throw new Error('Calendar permissions not granted');
    }

    const calendars = await getCalendars();
    const startDate = moment().startOf('day').toDate();
    const endDate = moment().endOf('day').toDate();

    let allEvents = [];
    for (const calendar of calendars) {
      const events = await Calendar.getEventsAsync(
        [calendar.id],
        startDate,
        endDate
      );
      
      allEvents = [...allEvents, ...events.map(event => ({
        id: event.id,
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        color: calendar.color,
        calendarId: calendar.id
      }))];
    }

    return allEvents.sort((a, b) => moment(a.startDate).diff(moment(b.startDate)));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}; 