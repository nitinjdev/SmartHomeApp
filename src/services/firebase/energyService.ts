import { db } from "./dbConstant";

export const subscribeToEnergyLogs = (
  onData: (logs: Record<string, Record<string, { kwh: number; cost: number }>>) => void,
  onError?: (error: Error) => void
) => {
  const ref = db.ref('energyLogs');

  const listener = ref.on(
    'value',
    snapshot => {
      onData(snapshot.val() || {});
    },
    error => {
      onError?.(error);
    }
  );

  return () => ref.off('value', listener);
};