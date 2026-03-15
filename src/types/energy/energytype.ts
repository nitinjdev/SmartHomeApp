

type Device = {
    id: string;
    name: string;
    type: string;
    status: 'on' | 'off';
    room: string;
    powerWatts: number;
    energyUsedKWh: number;
    lastUpdated: number;
    ownerId: string;
  };
  
  type EnergyLogEntry = {
    kwh: number;
    cost: number;
  };
  
  type RootState = {
    devices: {
      items: Device[];
    };
    energy: {
      logs: Record<string, Record<string, EnergyLogEntry>>;
    };
  };

  type Point = {
    date: string;
    kwh: number;
    cost: number;
  };

  type DeviceEnergyItem = {
    deviceId: string;
    deviceName: string;
    points: Point[];
    totalKwh: number;
    averageDailyKwh: number;
    totalCost: number;
  }

  type DeviveEnergyChartProps = {
    item: DeviceEnergyItem;
    chartConfig: any;
    styles: any;
  };

  export type {Device, EnergyLogEntry, RootState, Point, DeviveEnergyChartProps, DeviceEnergyItem}