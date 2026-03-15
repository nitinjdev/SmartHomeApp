import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type EnergyLogEntry = {
  kwh: number;
  cost: number;
};

type EnergyState = {
  logs: Record<string, Record<string, EnergyLogEntry>>;
  loading: boolean;
  error: string | null;
};

const initialState: EnergyState = {
  logs: {},
  loading: false,
  error: null,
};

const energySlice = createSlice({
  name: 'energy',
  initialState,
  reducers: {
    setEnergyLogs(state, action: PayloadAction<Record<string, Record<string, EnergyLogEntry>>>) {
      state.logs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setEnergyLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setEnergyError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setEnergyLogs, setEnergyLoading, setEnergyError } = energySlice.actions;
export default energySlice.reducer;