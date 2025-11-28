const webpush = require('web-push');

// VAPID keys configuration
// To generate VAPID keys, run: node -e "console.log(require('web-push').generateVAPIDKeys())"
// Then add them to your .env file
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_EMAIL || 'mailto:admin@pso.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
} else {
  console.warn('⚠️  VAPID keys not configured. Push notifications will not work.');
  console.warn('Generate keys with: node -e "console.log(require(\'web-push\').generateVAPIDKeys())"');
}

/**
 * Send push notification to a single subscription
 * @param {Object} subscription - Push subscription object
 * @param {Object} payload - Notification payload
 * @returns {Promise<Object>} - Send result
 */
async function sendPushNotification(subscription, payload) {
  try {
    const result = await webpush.sendNotification(
      subscription,
      JSON.stringify(payload)
    );

    return {
      success: true,
      result,
    };
  } catch (error) {
    console.error('Error sending push notification:', error);

    // If subscription is invalid/expired, mark for removal
    if (error.statusCode === 410) {
      return {
        success: false,
        expired: true,
        error: error.message,
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send live stream notification to all subscribers
 * @param {Array} subscriptions - Array of push subscriptions
 * @param {Object} streamInfo - Live stream information
 * @returns {Promise<Object>} - Send results
 */
async function sendLiveStreamNotification(subscriptions, streamInfo) {
  const payload = {
    title: streamInfo.title || '🔴 Live Service Starting!',
    body: streamInfo.message || 'Pastor Sola Olukoya is now live. Join us!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    url: streamInfo.url || '/live',
    tag: 'live-stream',
    requireInteraction: true,
    data: {
      type: 'live-stream',
      url: streamInfo.url || '/live',
      timestamp: Date.now(),
    },
    actions: [
      {
        action: 'join',
        title: 'Join Now',
      },
      {
        action: 'close',
        title: 'Dismiss',
      },
    ],
  };

  let sentCount = 0;
  let failedCount = 0;
  let expiredCount = 0;
  const expiredSubscriptions = [];

  for (const subscription of subscriptions) {
    const result = await sendPushNotification(subscription, payload);

    if (result.success) {
      sentCount++;
    } else {
      failedCount++;
      if (result.expired) {
        expiredCount++;
        expiredSubscriptions.push(subscription);
      }
    }
  }

  return {
    sentCount,
    failedCount,
    expiredCount,
    expiredSubscriptions,
    message: `Sent ${sentCount} notifications, ${failedCount} failed, ${expiredCount} expired`,
  };
}

/**
 * Send event reminder notification
 * @param {Array} subscriptions - Array of push subscriptions
 * @param {Object} eventInfo - Event information
 * @returns {Promise<Object>} - Send results
 */
async function sendEventReminder(subscriptions, eventInfo) {
  const payload = {
    title: eventInfo.title || '📅 Upcoming Event Reminder',
    body: eventInfo.message || 'You have an upcoming event soon!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    url: eventInfo.url || '/events',
    tag: `event-${eventInfo.eventId}`,
    data: {
      type: 'event-reminder',
      eventId: eventInfo.eventId,
      url: eventInfo.url || '/events',
      timestamp: Date.now(),
    },
    actions: [
      {
        action: 'view',
        title: 'View Event',
      },
      {
        action: 'close',
        title: 'Dismiss',
      },
    ],
  };

  let sentCount = 0;
  let failedCount = 0;
  const expiredSubscriptions = [];

  for (const subscription of subscriptions) {
    const result = await sendPushNotification(subscription, payload);

    if (result.success) {
      sentCount++;
    } else {
      failedCount++;
      if (result.expired) {
        expiredSubscriptions.push(subscription);
      }
    }
  }

  return {
    sentCount,
    failedCount,
    expiredSubscriptions,
    message: `Sent ${sentCount} event reminders, ${failedCount} failed`,
  };
}

/**
 * Send new blog post notification
 * @param {Array} subscriptions - Array of push subscriptions
 * @param {Object} postInfo - Blog post information
 * @returns {Promise<Object>} - Send results
 */
async function sendNewPostNotification(subscriptions, postInfo) {
  const payload = {
    title: postInfo.title || '📖 New Blog Post',
    body: postInfo.excerpt || 'A new devotional has been published!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    url: postInfo.url || '/blog',
    tag: `post-${postInfo.postId}`,
    data: {
      type: 'new-post',
      postId: postInfo.postId,
      url: postInfo.url || '/blog',
      timestamp: Date.now(),
    },
    actions: [
      {
        action: 'read',
        title: 'Read Now',
      },
      {
        action: 'close',
        title: 'Later',
      },
    ],
  };

  let sentCount = 0;
  let failedCount = 0;

  for (const subscription of subscriptions) {
    const result = await sendPushNotification(subscription, payload);

    if (result.success) {
      sentCount++;
    } else {
      failedCount++;
    }
  }

  return {
    sentCount,
    failedCount,
    message: `Sent ${sentCount} post notifications, ${failedCount} failed`,
  };
}

/**
 * Generate VAPID keys (utility function)
 * @returns {Object} - Public and private VAPID keys
 */
function generateVapidKeys() {
  return webpush.generateVAPIDKeys();
}

module.exports = {
  sendPushNotification,
  sendLiveStreamNotification,
  sendEventReminder,
  sendNewPostNotification,
  generateVapidKeys,
};
