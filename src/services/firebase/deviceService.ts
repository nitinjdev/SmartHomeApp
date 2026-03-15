// src/services/firebase/deviceService.ts
import { Device } from '../../types/device/deviceTypes';
import {db} from './dbConstant';

function mapDevicesObjectToArray(
  data: Record<string, Device> | null
): Device[] {
  if (!data) return [];

  return Object.values(data).sort(
    (a, b) => a.name.localeCompare(b.name)
  );
}

export function subscribeToUserDevices(
  uid: string,
  onData: (devices: Device[]) => void,
  onError?: (error: Error) => void
) {
  const query = db.ref('devices')
    .orderByChild('ownerId')
    .equalTo(uid);

  const handler = query.on(
    'value',
    snapshot => {
      const raw = snapshot.val() as Record<string, Device> | null;
      const devices = mapDevicesObjectToArray(raw);
      onData(devices);
    },
    error => {
      onError?.(error);
    }
  );

  return () => query.off('value', handler);
}

export const toggleDeviceStatus = async (
  deviceId: string,
  nextStatus: 'on' | 'off'
) => {
  await db.ref(`devices/${deviceId}`)
    .update({
      status: nextStatus,
      lastUpdated: Date.now(),
    });
};