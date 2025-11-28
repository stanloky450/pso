const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Google Calendar API setup
let calendar;
let auth;

/**
 * Initialize Google Calendar API
 * Requires google-credentials.json file in project root
 */
function initializeCalendar() {
  try {
    // Check if credentials file exists
    const credentialsPath = path.join(process.cwd(), 'google-credentials.json');

    if (!fs.existsSync(credentialsPath)) {
      console.warn('⚠️  Google Calendar credentials not found at:', credentialsPath);
      console.warn('To enable Google Calendar integration:');
      console.warn('1. Create a Google Cloud Project');
      console.warn('2. Enable Google Calendar API');
      console.warn('3. Create a Service Account');
      console.warn('4. Download credentials JSON');
      console.warn('5. Save as google-credentials.json in project root');
      return null;
    }

    auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ],
    });

    calendar = google.calendar({ version: 'v3', auth });
    console.log('✅ Google Calendar API initialized successfully');
    return calendar;
  } catch (error) {
    console.error('Error initializing Google Calendar:', error);
    return null;
  }
}

/**
 * Create a calendar event
 * @param {Object} eventData - Event information
 * @returns {Promise<Object>} - Created event
 */
async function createCalendarEvent(eventData) {
  try {
    if (!calendar) {
      calendar = initializeCalendar();
      if (!calendar) {
        throw new Error('Google Calendar not initialized');
      }
    }

    const authClient = await auth.getClient();

    const event = {
      summary: eventData.title,
      description: eventData.description || '',
      location: eventData.location || '',
      start: {
        dateTime: new Date(eventData.startDate).toISOString(),
        timeZone: eventData.timeZone || 'Africa/Lagos',
      },
      end: {
        dateTime: new Date(eventData.endDate).toISOString(),
        timeZone: eventData.timeZone || 'Africa/Lagos',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
          { method: 'popup', minutes: 10 }, // 10 minutes before
        ],
      },
    };

    // Add conference/meeting link if online event
    if (eventData.isOnline && eventData.meetingLink) {
      event.conferenceData = {
        entryPoints: [
          {
            entryPointType: 'video',
            uri: eventData.meetingLink,
            label: 'Join Online',
          },
        ],
      };
    }

    // Add attendees if provided
    if (eventData.attendees && eventData.attendees.length > 0) {
      event.attendees = eventData.attendees.map((email) => ({ email }));
    }

    const response = await calendar.events.insert({
      auth: authClient,
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      resource: event,
      conferenceDataVersion: eventData.isOnline ? 1 : 0,
      sendNotifications: true,
    });

    console.log('✅ Calendar event created:', response.data.htmlLink);

    return {
      success: true,
      event: response.data,
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Update a calendar event
 * @param {string} eventId - Google Calendar event ID
 * @param {Object} eventData - Updated event information
 * @returns {Promise<Object>} - Updated event
 */
async function updateCalendarEvent(eventId, eventData) {
  try {
    if (!calendar) {
      calendar = initializeCalendar();
      if (!calendar) {
        throw new Error('Google Calendar not initialized');
      }
    }

    const authClient = await auth.getClient();

    const event = {
      summary: eventData.title,
      description: eventData.description || '',
      location: eventData.location || '',
      start: {
        dateTime: new Date(eventData.startDate).toISOString(),
        timeZone: eventData.timeZone || 'Africa/Lagos',
      },
      end: {
        dateTime: new Date(eventData.endDate).toISOString(),
        timeZone: eventData.timeZone || 'Africa/Lagos',
      },
    };

    const response = await calendar.events.update({
      auth: authClient,
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId: eventId,
      resource: event,
      sendNotifications: true,
    });

    console.log('✅ Calendar event updated:', response.data.htmlLink);

    return {
      success: true,
      event: response.data,
      htmlLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error('Error updating calendar event:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Delete a calendar event
 * @param {string} eventId - Google Calendar event ID
 * @returns {Promise<Object>} - Delete result
 */
async function deleteCalendarEvent(eventId) {
  try {
    if (!calendar) {
      calendar = initializeCalendar();
      if (!calendar) {
        throw new Error('Google Calendar not initialized');
      }
    }

    const authClient = await auth.getClient();

    await calendar.events.delete({
      auth: authClient,
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId: eventId,
      sendNotifications: true,
    });

    console.log('✅ Calendar event deleted:', eventId);

    return {
      success: true,
      message: 'Event deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get upcoming events from calendar
 * @param {number} maxResults - Maximum number of events to retrieve
 * @returns {Promise<Object>} - List of events
 */
async function getUpcomingEvents(maxResults = 10) {
  try {
    if (!calendar) {
      calendar = initializeCalendar();
      if (!calendar) {
        throw new Error('Google Calendar not initialized');
      }
    }

    const authClient = await auth.getClient();

    const response = await calendar.events.list({
      auth: authClient,
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: new Date().toISOString(),
      maxResults: maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return {
      success: true,
      events: response.data.items || [],
    };
  } catch (error) {
    console.error('Error getting upcoming events:', error);
    return {
      success: false,
      error: error.message,
      events: [],
    };
  }
}

/**
 * Sync event with Google Calendar (create or update)
 * @param {Object} eventData - Event data with optional googleCalendarId
 * @returns {Promise<Object>} - Sync result
 */
async function syncEvent(eventData) {
  if (eventData.googleCalendarId) {
    // Update existing event
    return updateCalendarEvent(eventData.googleCalendarId, eventData);
  } else {
    // Create new event
    return createCalendarEvent(eventData);
  }
}

module.exports = {
  initializeCalendar,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getUpcomingEvents,
  syncEvent,
};
