// src/components/DeviceCard/DeviceCard.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Device } from '../../types/device/deviceTypes';

type Props = {
  device: Device;
  disabled?: boolean;
  onToggle: () => void;
};

export default function DeviceCard({ device, disabled, onToggle }: Props) {
  return (
    <View style={styles.main}>
      <View style={{ flex: 1 }}>
        <Text style={{fontWeight:'bold'}}>{device.name}</Text>
        <Text>{device.room}</Text>
        <Text>Status: {device.status.toUpperCase()}</Text>
        <Text>Power : {device.powerWatts} W</Text>
        <Text>Energy: {device.energyUsedKWh} kWh</Text>
      </View>

      <Switch
        value={device.status === 'on'}
        onValueChange={onToggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
    marginTop:20,
    marginHorizontal:20,
    borderRadius:10,
    borderWidth: 1,
    //backgroundColor:'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})