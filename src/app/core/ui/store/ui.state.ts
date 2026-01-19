import { UISnackbar } from '../models/UISnackbar.model';
import { UINotification } from '../models/UINotification.model';

export interface UIState {
  notifications: UINotification[];
  snackbar: UISnackbar | null;
  globalLoading: boolean;
}

export const initialUIState: UIState = {
  notifications: [],
  snackbar: null,
  globalLoading: false,
};
