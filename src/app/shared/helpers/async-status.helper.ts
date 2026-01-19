import { AsyncStatus } from '../interfaces/AsyncStatus.model';

export const loadingStatus = (): AsyncStatus => ({
  loading: true,
  error: false,
});

export const successStatus = (): AsyncStatus => ({
  loading: false,
  error: false,
});

export const errorStatus = (): AsyncStatus => ({
  loading: false,
  error: true,
});
