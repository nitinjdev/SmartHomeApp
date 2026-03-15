export type DeviceStatus = 'on' | 'off';

export interface Device {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  room: string;
  powerWatts: number;
  energyUsedKWh: number;
  lastUpdated: number;
  ownerId: string;
}