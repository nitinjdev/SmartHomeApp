// src/features/devices/deviceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../../types/device/deviceTypes';


interface DevicesState {
  items: Device[];
  loading: boolean;
  error: string | null;
  updatingIds: string[];
}

const initialState: DevicesState = {
  items: [],
  loading: true,
  error: null,
  updatingIds: [],
};

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDevices(state, action: PayloadAction<Device[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setDevicesLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setDevicesError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    startDeviceUpdate(state, action: PayloadAction<string>) {
      if (!state.updatingIds.includes(action.payload)) {
        state.updatingIds.push(action.payload);
      }
    },
    finishDeviceUpdate(state, action: PayloadAction<string>) {
      state.updatingIds = state.updatingIds.filter(
        id => id !== action.payload
      );
    },
    updateDeviceStatusLocally: (state, action) => {
        const { deviceId, status } = action.payload;
      
        const foundDevice = state.items.find(item => item.id === deviceId);
        if (foundDevice) {
          foundDevice.status = status;
        }
      },
    clearDevices(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.updatingIds = [];
    },
  },
});

export const {
  setDevices,
  setDevicesLoading,
  setDevicesError,
  startDeviceUpdate,
  finishDeviceUpdate,
  clearDevices,
  updateDeviceStatusLocally
} = deviceSlice.actions;

export default deviceSlice.reducer;