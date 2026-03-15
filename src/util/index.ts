import { createUserWithEmailAndPassword, getAuth } from "@react-native-firebase/auth";

export const toggleStatus = (status: 'on' | 'off'): 'on' | 'off' => {
    return status === 'on' ? 'off' : 'on';
  };

  export const emailPattern = /^(?!.*\.\.)[A-Za-z0-9._%+-]+(?<!\.)@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  export const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

  export const validateLogin = (email: string, password: string) => {
    if (!email || email.trim().length === 0) {
      return { field: "email", message: "Email is required" };
    }
  
    if (!emailPattern.test(email)) {
      return { field: "email", message: "Enter valid email address" };
    }
  
    if (!password || password.length === 0) {
      return { field: "password", message: "Password is required" };
    }
  
    if (password.length < 6) {
      return { field: "password", message: "Password must be at least 6 characters" };
    }
  
    return { valid: true };
  };

  export const getLast7Days = () => {
    const dates: string[] = [];
    const base = new Date('2024-04-03'); // edit date for now
  
    for (let i = 6; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(base.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
  
    return dates;
  };

  type Device = {
    id: string;
    name: string;
    room: string;
  };
  
  type EnergyLog = {
    [date: string]: {
      kwh: number;
      cost: number;
    };
  };
  
  export const buildDeviceEnergyAnalytics = (
    devices: Device[],
    energyLogs: Record<string, EnergyLog>,
    last7Days: string[]
  ) => {
    return devices.map(device => {
      const logs = energyLogs?.[device.id] || {};
  
      const points = last7Days.map(date => ({
        date,
        kwh: logs?.[date]?.kwh ?? 0,
        cost: logs?.[date]?.cost ?? 0,
      }));
  
      const totalKwh = points.reduce((sum, item) => sum + item.kwh, 0);
      const totalCost = points.reduce((sum, item) => sum + item.cost, 0);
  
      return {
        deviceId: device.id,
        deviceName: device.name,
        room: device.room,
        points,
        totalKwh,
        totalCost,
        averageDailyKwh: totalKwh / last7Days.length,
      };
    });
  };

  export const createUser=(email: string, password:string)=>{
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
        console.log('User account created & signed in!');
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        }
        console.error(error);
    });
}