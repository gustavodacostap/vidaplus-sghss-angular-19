import { createAction, props } from '@ngrx/store';
import { UINotification } from '../models/UINotification.model';

export const setNotifications = createAction(
  '[UI] Set Notifications',
  props<{ notifications: UINotification[] }>(),
);

export const addNotification = createAction(
  '[UI] Add Notification',
  props<{ notification: UINotification }>(),
);

export const markAllNotificationsAsRead = createAction('[UI] Mark All Notifications As Read');

export const clearNotifications = createAction('[UI] Clear Notifications');

export const showSnackbar = createAction(
  '[UI] Show Snackbar',
  props<{ message: string; logMessage?: string }>(),
);

export const clearSnackbar = createAction('[UI] Clear Snackbar');
